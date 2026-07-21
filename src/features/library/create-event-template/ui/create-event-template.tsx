import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { buildRoute } from "@/shared/config";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator
} from "@/shared/ui";

import { LIBRARY_EVENT_CREATE_ID } from "@/entities/tour";

import { CREATE_EVENT_TEMPLATE_OPTIONS } from "../model";

import { CreateEventTemplateTypeCard } from "./create-event-template-type-card";

export const CreateEventTemplate: FC = () => {
	const { t } = useTranslation("event_templates_page");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("new_template.button")}</Button>
			</DialogTrigger>
			<DialogContent className="min-w-[480px]">
				<DialogHeader>
					<DialogTitle>{t("create.title")}</DialogTitle>
					<DialogDescription>
						{t("create.subtitle")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="grid gap-3 py-2">
					{CREATE_EVENT_TEMPLATE_OPTIONS.map((option) => (
						<Link
							to={buildRoute(option.path, {
								libraryId: LIBRARY_EVENT_CREATE_ID
							})}
							className="block no-underline text-inherit"
						>
							<CreateEventTemplateTypeCard
								title={t(option.title)}
								description={t(option.description)}
								icon={option.icon}
								iconBgClassName={option.iconBgClassName}
							/>
						</Link>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
