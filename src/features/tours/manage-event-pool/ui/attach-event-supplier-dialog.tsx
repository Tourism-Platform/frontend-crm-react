import { Loader } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	LoaderButton,
	ScrollArea
} from "@/shared/ui";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	type ISupplier,
	useListSuppliersQuery
} from "@/entities/supplier";

interface IAttachEventSupplierDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	supplierTyp: ENUM_SUPPLIER_TYPE_TYPE;
	isSubmitting?: boolean;
	onConfirm: (supplierId: string) => void | Promise<void>;
}

export const AttachEventSupplierDialog: FC<IAttachEventSupplierDialogProps> = ({
	open,
	onOpenChange,
	supplierTyp,
	isSubmitting,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");
	const [search, setSearch] = useState("");
	const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(
		null
	);

	useEffect(() => {
		if (!open) return;
		setSearch("");
		setSelectedSupplierId(null);
	}, [open]);

	const { data, isFetching, isError, refetch } = useListSuppliersQuery(
		{
			page: 1,
			limit: 50,
			search: search.trim() || undefined,
			supplierType: supplierTyp
		},
		{ skip: !open }
	);

	const suppliers: ISupplier[] = data?.data ?? [];

	const handleConfirm = async () => {
		if (!selectedSupplierId) return;
		await onConfirm(selectedSupplierId);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[640px] max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{t("pool.attach_supplier.dialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("pool.attach_supplier.dialog.description")}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="pool-attach-supplier-search">
							{t(
								"pool.attach_supplier.dialog.fields.search.label"
							)}
						</Label>
						<Input
							id="pool-attach-supplier-search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder={t(
								"pool.attach_supplier.dialog.fields.search.placeholder"
							)}
						/>
					</div>

					<div className="grid gap-2">
						{isError ? (
							<div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
								<span>
									{t(
										"pool.attach_supplier.dialog.load_error"
									)}
								</span>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => refetch()}
								>
									{t("pool.attach_supplier.dialog.retry")}
								</Button>
							</div>
						) : null}

						<ScrollArea className="h-64 rounded-md border">
							<div className="grid gap-1 p-2">
								{isFetching && !suppliers.length ? (
									<div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
										<Loader className="h-4 w-4 animate-spin" />
										{t(
											"pool.attach_supplier.dialog.loading"
										)}
									</div>
								) : null}
								{!isFetching && !suppliers.length ? (
									<p className="p-6 text-center text-sm text-muted-foreground">
										{t("pool.attach_supplier.dialog.empty")}
									</p>
								) : null}
								{suppliers.map((supplier) => {
									const isSelected =
										supplier.id === selectedSupplierId;

									return (
										<button
											key={supplier.id}
											type="button"
											className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
												isSelected
													? "bg-primary text-primary-foreground"
													: "hover:bg-muted"
											}`}
											onClick={() =>
												setSelectedSupplierId(
													supplier.id
												)
											}
										>
											<p className="font-medium">
												{supplier.brandName}
											</p>
											{supplier.legalName ? (
												<p className="text-xs opacity-80">
													{supplier.legalName}
												</p>
											) : null}
										</button>
									);
								})}
							</div>
						</ScrollArea>
					</div>
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="ghost"
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
					>
						{t("pool.attach_supplier.dialog.cancel")}
					</Button>
					<LoaderButton
						type="button"
						onClick={handleConfirm}
						disabled={!selectedSupplierId}
						isLoading={Boolean(isSubmitting)}
						label={t("pool.attach_supplier.dialog.confirm")}
						loadingLabel={t(
							"pool.attach_supplier.dialog.confirming"
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
