import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Search } from "lucide-react";
import { type FC, useMemo } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import {
	ENUM_LANGUAGES,
	ENUM_PATH,
	buildRouteWithQuery,
	i18nLanguageMapper
} from "@/shared/config";
import {
	Button,
	Card,
	CardContent,
	CustomField,
	Form,
	Separator
} from "@/shared/ui";

import { useGeoSearchFieldProps } from "@/entities/geo";
import {
	type TSearchTours,
	createSearchToursSchema,
	mapSearchToursToSearchQuery
} from "@/entities/tour";

interface ISearchToursBarProps {
	form?: UseFormReturn<TSearchTours>;
}

export const SearchToursBar: FC<ISearchToursBarProps> = ({
	form: externalForm
}) => {
	const { t, i18n } = useTranslation("common_tours");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const geoField = useGeoSearchFieldProps(language);

	const schema = useMemo(
		() => createSearchToursSchema(t("search.form.fields.where.required")),
		[t]
	);

	const localForm = useForm<TSearchTours>({
		resolver: zodResolver(schema),
		defaultValues: {
			destination: null,
			dates: undefined
		}
	});

	const form = externalForm ?? localForm;

	const onSubmit = (data: TSearchTours) => {
		const route = buildRouteWithQuery(
			ENUM_PATH.TOURS.SEARCH,
			mapSearchToursToSearchQuery(data)
		);
		navigate(route);
	};

	return (
		<Card>
			<CardContent className="px-4 sm:px-6">
				<Form {...form}>
					<form
						className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_auto_1fr_auto] md:gap-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<CustomField
							icon={MapPin}
							control={form.control}
							name="destination"
							label="search.form.fields.where.label"
							placeholder="search.form.fields.where.placeholder"
							fieldType="geo"
							emptyText="search.form.fields.where.empty"
							options={geoField.options}
							onQueryChange={geoField.onQueryChange}
							isLoading={geoField.isLoading}
							t={t}
							className="mb-0"
						/>

						<Separator
							orientation="vertical"
							className="bg-border/80 hidden h-10 md:block"
						/>

						<CustomField
							control={form.control}
							name="dates"
							label="search.form.fields.when.label"
							placeholder="search.form.fields.when.placeholder"
							fieldType="dateRange"
							t={t}
							className="mb-0"
						/>

						<Button
							type="submit"
							size="lg"
							className="h-12 gap-2 rounded-xl px-6 text-base font-semibold shadow-sm sm:min-w-40"
						>
							{t("search.form.buttons.search")}
							<Search className="size-5" />
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
