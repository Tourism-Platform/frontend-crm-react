import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import { FLIGHT_EDIT_TABS_LIST } from "./model";

export const FlightEdit: FC = () => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<section className="flex flex-col gap-6 max-w-5xl mx-auto">
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={FLIGHT_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-3">
							{FLIGHT_EDIT_TABS_LIST.map((item) => (
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
						{FLIGHT_EDIT_TABS_LIST.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								<item.slot />
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>
				</CardContent>
			</Card>
		</section>
	);
};
