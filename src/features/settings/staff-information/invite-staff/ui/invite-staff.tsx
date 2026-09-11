import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/shared/hooks";
import {
	Button,
	CustomField,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	LoaderButton,
	Separator
} from "@/shared/ui";

import {
	ENUM_FORM_INVITE_STAFF,
	INVITE_STAFF_SCHEMA,
	type TInviteStaffSchema,
	useCreateStaffMutation
} from "@/entities/staff";

import { FORM_INVITE_STAFF_LIST } from "../model";

export const InviteStaff: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [isPasswordLocked, setIsPasswordLocked] = useState(false);
	const { t } = useTranslation("staff_information_page");
	const [createStaff, { isLoading }] = useCreateStaffMutation();
	const copy = useCopyToClipboard({
		successMessage: t("invite.form.toasts.copied"),
		errorMessage: t("invite.form.toasts.copy_failed")
	});

	const form = useForm<TInviteStaffSchema>({
		resolver: zodResolver(INVITE_STAFF_SCHEMA),
		defaultValues: {
			[ENUM_FORM_INVITE_STAFF.PASSWORD]: "",
			[ENUM_FORM_INVITE_STAFF.PERMISSIONS]: []
		},
		mode: "onSubmit"
	});

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen);
		if (!nextOpen) {
			form.reset();
			setIsPasswordLocked(false);
		}
	};

	async function onSubmit(data: TInviteStaffSchema) {
		try {
			const result = await createStaff(data).unwrap();
			toast.success(t("invite.form.toasts.success"));

			if (result.generatedPassword) {
				form.setValue(
					ENUM_FORM_INVITE_STAFF.PASSWORD,
					result.generatedPassword
				);
			}

			setIsPasswordLocked(true);
		} catch (error) {
			toast.error(t("invite.form.toasts.error"));
			console.error("Failed to create staff:", error);
		}
	}

	const handleCopy = async () => {
		await copy(form.getValues(ENUM_FORM_INVITE_STAFF.PASSWORD) ?? "");
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button>{t("invite.button")}</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => handleOpenChange(false)}
				className="min-w-[700px]"
			>
				<DialogHeader>
					<DialogTitle>{t("invite.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("invite.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_INVITE_STAFF_LIST().map(
								({ key, ...item }) => {
									if (
										key ===
											ENUM_FORM_INVITE_STAFF.PASSWORD &&
										isPasswordLocked
									) {
										return (
											<div
												key={key}
												className="col-span-2 flex items-end gap-2"
											>
												<CustomField
													control={form.control}
													name={key}
													t={t}
													label="invite.form.fields.password.label"
													placeholder="invite.form.fields.password.placeholder"
													fieldType="input"
													readOnly
													className="min-w-0 flex-1"
												/>
												<Button
													type="button"
													variant="outline"
													size="icon"
													className="mb-5"
													onClick={handleCopy}
												>
													<Copy className="size-4" />
													<span className="sr-only">
														{t(
															"invite.form.generated.copy"
														)}
													</span>
												</Button>
											</div>
										);
									}

									return (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									);
								}
							)}
						</div>
						<DialogFooter>
							<DialogClose
								asChild
								onClick={() => handleOpenChange(false)}
							>
								<Button type="reset" variant="outline">
									{t("invite.form.buttons.decline")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={isLoading}
								label={t("invite.form.buttons.save")}
								loadingLabel={t("invite.form.buttons.saving")}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
