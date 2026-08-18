import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BoxOutlineIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator
} from "@/shared/ui";

import type { TPackageEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../events/ui";

import { PackagePricing } from "./ui";

export interface IPackageEditProps {
	form: UseFormReturn<TPackageEditSchema>;
	onSubmit: () => Promise<void>;
	isLoading: boolean;
	backToEventHref?: string;
}

const PACKAGE_TAB = "pricing";

export const PackageEdit: FC<IPackageEditProps> = ({
	form,
	onSubmit,
	isLoading,
	backToEventHref
}) => {
	const { t } = useTranslation("tour_package_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={BoxOutlineIcon}
					placeholder={t("input.title.placeholder")}
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs defaultValue={PACKAGE_TAB}>
							<CustomOptionTabsList
								style={{
									gridTemplateColumns:
										"repeat(1, minmax(0, 1fr))"
								}}
							>
								<CustomOptionTabsTrigger
									value={PACKAGE_TAB}
									variant={"tongue"}
								>
									{t("tabs.pricing")}
								</CustomOptionTabsTrigger>
							</CustomOptionTabsList>
							<Separator className="mb-6" />
							<CustomOptionTabsContent value={PACKAGE_TAB}>
								<PackagePricing
									form={form}
									onSubmit={onSubmit}
									isLoading={isLoading}
									backToEventHref={backToEventHref}
								/>
							</CustomOptionTabsContent>
						</CustomOptionTabs>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
