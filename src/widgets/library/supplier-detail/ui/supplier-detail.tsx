import { zodResolver } from "@hookform/resolvers/zod";
import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { ChevronLeft, Loader, PlusIcon, TrashIcon } from "lucide-react";
import {
	type ChangeEvent,
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CustomField,
	Form,
	PageLoader,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	ENUM_FORM_SUPPLIER as ENUM_FORM,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	SUPPLIER_UPDATE_SCHEMA,
	type TSupplierUpdateSchema,
	useDeleteSupplierLogoMutation,
	useGetSupplierQuery,
	useListAllProductsQuery,
	useUpdateSupplierMutation,
	useUploadSupplierLogoMutation
} from "@/entities/supplier";

import { COLUMNS, FORM_SUPPLIER_DETAIL_LIST } from "../model";

interface ISupplierDetailProps {
	supplierId: string;
}

const SupplierDetailBase: FC<ISupplierDetailProps> = ({ supplierId }) => {
	const { t } = useTranslation("supplier_id_page");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {
		data: supplier,
		isLoading: isSupplierLoading,
		isRealError: isSupplierError
	} = useOptionalResourceQuery(
		useGetSupplierQuery({ supplierId }, { skip: !supplierId })
	);

	const {
		data: productsData,
		isLoading: isProductsLoading,
		isFetching: isProductsFetching,
		isRealError: isProductsError
	} = useOptionalResourceQuery(
		useListAllProductsQuery(
			{ supplierId, page, limit },
			{ skip: !supplierId }
		)
	);

	const [updateSupplier, { isLoading: isSaving }] =
		useUpdateSupplierMutation();
	const [uploadLogo, { isLoading: isUploading }] =
		useUploadSupplierLogoMutation();
	const [deleteLogo, { isLoading: isDeletingLogo }] =
		useDeleteSupplierLogoMutation();

	const form = useForm<TSupplierUpdateSchema>({
		resolver: zodResolver(SUPPLIER_UPDATE_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FORM.BRAND_NAME]: "",
			[ENUM_FORM.LEGAL_NAME]: "",
			[ENUM_FORM.PHONE]: "",
			[ENUM_FORM.WEBSITE]: "",
			[ENUM_FORM.SUPPLIER_TYPES]: []
		}
	});

	useEffect(() => {
		if (!supplier) return;
		form.reset({
			[ENUM_FORM.BRAND_NAME]: supplier.brandName,
			[ENUM_FORM.LEGAL_NAME]: supplier.legalName ?? "",
			[ENUM_FORM.PHONE]: supplier.phone ?? "",
			[ENUM_FORM.WEBSITE]: supplier.website ?? "",
			[ENUM_FORM.SUPPLIER_TYPES]: supplier.supplierTypes
		});
	}, [supplier, form]);

	useEffect(() => {
		if (isSupplierError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isSupplierError, t]);

	useEffect(() => {
		if (isProductsError) {
			toast.error(t("toasts.load_products.error"));
		}
	}, [isProductsError, t]);

	const products = useMemo(() => productsData?.data ?? [], [productsData]);
	const totalCount = productsData?.total ?? 0;
	const columns = useMemo(() => COLUMNS(t, supplierId), [t, supplierId]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: page - 1,
			pageSize: limit
		}),
		[page, limit]
	);

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const currentPagination = {
				pageIndex: page - 1,
				pageSize: limit
			};
			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(currentPagination)
					: updaterOrValue;
			setPage(nextValue.pageIndex + 1);
			setLimit(nextValue.pageSize);
		},
		[page, limit]
	);

	async function onSubmit(data: TSupplierUpdateSchema) {
		if (!supplierId) return;
		try {
			await updateSupplier({
				supplierId,
				data
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error("Failed to update supplier:", error);
		}
	}

	const handleLogoChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file || !supplierId) return;
		try {
			await uploadLogo({ supplierId, file }).unwrap();
			toast.success(t("form.toasts.logo.success"));
		} catch (error) {
			toast.error(t("form.toasts.logo.error"));
			console.error("Failed to upload supplier logo:", error);
		}
	};

	const handleDeleteLogo = async () => {
		if (!supplierId) return;
		try {
			await deleteLogo({ supplierId }).unwrap();
			toast.success(t("form.toasts.logo.success"));
		} catch (error) {
			toast.error(t("form.toasts.logo.error"));
			console.error("Failed to delete supplier logo:", error);
		}
	};

	const actionsJsx = useMemo(
		() => (
			<div className="flex flex-wrap gap-2">
				<Button asChild>
					<Link
						to={buildRoute(
							ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT,
							{
								supplierId,
								productId: LIBRARY_SUPPLIER_PRODUCT_CREATE_ID
							}
						)}
					>
						<p>{t("products.new_hotel")}</p>
						<PlusIcon />
					</Link>
				</Button>
				<Button asChild variant="outline">
					<Link
						to={buildRoute(
							ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT,
							{
								supplierId,
								productId: LIBRARY_SUPPLIER_PRODUCT_CREATE_ID
							}
						)}
					>
						<p>{t("products.new_train")}</p>
						<PlusIcon />
					</Link>
				</Button>
			</div>
		),
		[supplierId, t]
	);

	if (isSupplierLoading) {
		return <PageLoader />;
	}

	if (!supplier) {
		return null;
	}

	const isLogoBusy = isUploading || isDeletingLogo;

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Button variant="ghost" className="w-fit px-0" asChild>
					<Link to={ENUM_PATH.LIBRARY.SUPPLIERS}>
						<ChevronLeft className="mr-1 h-4 w-4" />
						{t("back")}
					</Link>
				</Button>
				<h1 className="text-3xl">
					{supplier.brandName || t("page_name")}
				</h1>
			</div>

			<Card>
				<CardContent className="space-y-6">
					<div className="flex flex-wrap items-center gap-4">
						{supplier.logoPath ? (
							<img
								src={supplier.logoPath}
								alt={supplier.brandName}
								className="size-24 rounded-md border object-cover"
							/>
						) : (
							<div className="flex size-24 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
								{t("logo.label")}
							</div>
						)}
						<div className="flex flex-wrap gap-2">
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								className="sr-only"
								onChange={handleLogoChange}
							/>
							<Button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								disabled={isLogoBusy}
							>
								{isUploading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isUploading
									? t("logo.uploading")
									: t("logo.upload")}
							</Button>
							{supplier.logoPath ? (
								<Button
									type="button"
									variant="outline"
									onClick={handleDeleteLogo}
									disabled={isLogoBusy}
								>
									{isDeletingLogo ? (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<TrashIcon className="mr-2 h-4 w-4" />
									)}
									{isDeletingLogo
										? t("logo.deleting")
										: t("logo.delete")}
								</Button>
							) : null}
						</div>
					</div>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<div className="grid grid-cols-2 gap-x-4 gap-y-1">
								{FORM_SUPPLIER_DETAIL_LIST().map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}
							</div>
							<div className="flex justify-end">
								<Button
									type="submit"
									size="lg"
									disabled={isSaving}
								>
									{isSaving && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSaving
										? t("form.buttons.saving")
										: t("form.buttons.save")}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<h2 className="mb-4 text-lg font-medium">
						{t("products_title")}
					</h2>
					<SmartTable
						data={products}
						columns={columns}
						actions={actionsJsx}
						isLoading={isProductsLoading || isProductsFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const SupplierDetail = withErrorBoundary(SupplierDetailBase);
