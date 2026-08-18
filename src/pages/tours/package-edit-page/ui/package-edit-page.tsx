import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	PACKAGE_EDIT_SCHEMA,
	TOUR_PACKAGE_CREATE_ID,
	type TPackageEditSchema,
	getEmptyPackageForm,
	useCreatePackageMutation,
	useGetPackageQuery,
	useUpdatePackageMutation
} from "@/entities/tour";

import { buildEventPricingReturnRoute } from "@/features/tours";

import { PackageEdit } from "@/widgets/tours";

export const PackageEditPage: FC = () => {
	const { t } = useTranslation("tour_package_edit_page");
	const navigate = useNavigate();
	const {
		tourId = "",
		optionId = "",
		packageId = ""
	} = useParams<{
		tourId: string;
		optionId: string;
		packageId: string;
	}>();
	const [searchParams] = useSearchParams();
	const isCreate = packageId === TOUR_PACKAGE_CREATE_ID;
	const fromEventId = searchParams.get("fromEventId");
	const fromEventType = searchParams.get("fromEventType");
	const fromEventOptionId = searchParams.get("fromEventOptionId");

	const { data, isRealError, isLoading } = useOptionalResourceQuery(
		useGetPackageQuery(
			{ tourId, optionId, packageId },
			{ skip: !tourId || !optionId || !packageId || isCreate }
		)
	);

	const [createPackage, { isLoading: isCreateLoading }] =
		useCreatePackageMutation();
	const [updatePackage, { isLoading: isUpdateLoading }] =
		useUpdatePackageMutation();

	const form = useForm<TPackageEditSchema>({
		resolver: zodResolver(PACKAGE_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: getEmptyPackageForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && data) {
			form.reset(data);
		}
	}, [data, form, isCreate]);

	const onSubmit = async () => {
		if (
			!(await validateFormWithSectionToast(form, t, {
				keyPrefix: "form.toasts.validation.error"
			}))
		) {
			return;
		}

		const payload = form.getValues();

		try {
			if (isCreate) {
				const created = await createPackage({
					tourId,
					optionId,
					data: payload
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(
						ENUM_PATH.TOURS.PACKAGE,
						{
							tourId,
							optionId,
							packageId: created.id
						},
						fromEventId && fromEventType
							? {
									fromEventId,
									fromEventType,
									fromEventOptionId
								}
							: undefined
					),
					{ replace: true }
				);
				return;
			}

			await updatePackage({
				tourId,
				optionId,
				packageId,
				data: payload
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				isCreate
					? t("form.toasts.create.error")
					: t("form.toasts.save.error")
			);
			console.log(error);
		}
	};

	const backToEventHref =
		fromEventId && fromEventType
			? buildEventPricingReturnRoute({
					tourId,
					optionId,
					fromEventId,
					fromEventType,
					fromEventOptionId
				})
			: undefined;

	return (
		<PackageEdit
			form={form}
			onSubmit={onSubmit}
			isLoading={isLoading || isCreateLoading || isUpdateLoading}
			backToEventHref={backToEventHref}
		/>
	);
};
