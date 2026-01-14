import { MapPin, Search } from "lucide-react";
import { type FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import {
	Button,
	Card,
	CardContent,
	CustomField,
	Form,
	Separator
} from "@/shared/ui";

import { useGetCatalogDestinationsQuery } from "@/entities/tour/catalog";

interface ISearchTours {
	destination: string;
	dates?: {
		from: string;
		to: string;
	};
}

export const SearchTours: FC = () => {
	const { t } = useTranslation("common_tours");

	const { data: destinations = [] } = useGetCatalogDestinationsQuery();

	const destinationOptions = useMemo(() => {
		return destinations.map((item) => ({
			label: item.title,
			value: item.id
		}));
	}, [destinations]);

	const form = useForm<ISearchTours>({
		defaultValues: {
			destination: "",
			dates: {
				from: "",
				to: ""
			}
		}
	});

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] items-end gap-4">
						<CustomField
							icon={MapPin}
							control={form.control}
							name="destination"
							label="search.form.fields.where.label"
							placeholder="search.form.fields.where.placeholder"
							fieldType="autocomplete"
							emptyText="search.form.fields.where.empty"
							options={destinationOptions}
							t={t}
							className="mb-0"
						/>

						<Separator orientation="vertical" className="h-8" />

						<CustomField
							control={form.control}
							name="dates"
							label="search.form.fields.when.label"
							placeholder="search.form.fields.when.placeholder"
							fieldType="dateRange"
							t={t}
							className="mb-0"
						/>

						<Button className="text-xl px-5 py-4 h-auto">
							<Link
								to={ENUM_PATH.TOURS.SEARCH}
								className="flex items-center gap-2"
							>
								<span>{t("search.form.buttons.search")}</span>
								<Search className="size-6" />
							</Link>
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
