import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TaskSquareIcon } from "@/shared/assets";
import { useQueryTab } from "@/shared/hooks";
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

import type { TMultiplyOptionEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { MULTIPLY_OPTION_EDIT_TABS_LIST } from "./model";

export interface IMultiplyOptionEditProps {
	form: UseFormReturn<TMultiplyOptionEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
}

export const MultiplyOptionEdit: FC<IMultiplyOptionEditProps> = ({
	form,
	createSectionSubmit,
	isLoading
}) => {
	const { t } = useTranslation("multiply_option_edit_page");
	const allowedTabs = MULTIPLY_OPTION_EDIT_TABS_LIST.map((item) => item.type);
	const [initialTab, setTab] = useQueryTab(allowedTabs[0], allowedTabs);

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={TaskSquareIcon}
					placeholder={t("general.form.fields.title.placeholder")}
					className="bg-zinc-700"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={initialTab}
							onValueChange={setTab}
						>
							<CustomOptionTabsList className="grid-cols-2">
								{MULTIPLY_OPTION_EDIT_TABS_LIST.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										variant={"tongue"}
									>
										{t(item?.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
							<Separator className="mb-6" />
							{MULTIPLY_OPTION_EDIT_TABS_LIST.map((item) => (
								<CustomOptionTabsContent
									key={item.type}
									value={item.type}
								>
									<item.slot
										form={form}
										onSubmit={createSectionSubmit}
										isLoading={isLoading}
									/>
								</CustomOptionTabsContent>
							))}
						</CustomOptionTabs>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
