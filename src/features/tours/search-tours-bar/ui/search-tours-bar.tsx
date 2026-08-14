import { zodResolver } from "@hookform/resolvers/zod";
import { MapPointIcon } from "@solar-icons/react/outline";
import { Search } from "lucide-react";
import { type FC, useMemo } from "react";
import {
	Controller,
	type Resolver,
	type UseFormReturn,
	useForm
} from "react-hook-form";
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

import {
	LocationSuggestSelect,
	type TCatalogLocationBar,
	type TSearchTours,
	createSearchToursSchema,
	mapSearchToursToSearchQuery,
	useLocationSuggestFieldProps
} from "@/entities/tour";

interface ISearchToursBarProps {
	form?: UseFormReturn<TCatalogLocationBar>;
	onSubmit?: (data: TCatalogLocationBar) => void;
}

export const SearchToursBar: FC<ISearchToursBarProps> = ({
	form: externalForm,
	onSubmit: onSubmitExternal
}) => {
	const { t, i18n } = useTranslation("common_tours");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const suggestField = useLocationSuggestFieldProps(language);

	const schema = useMemo(
		() => createSearchToursSchema(t("search.form.fields.where.required")),
		[t]
	);

	const localForm = useForm<TCatalogLocationBar>({
		resolver: zodResolver(schema) as Resolver<TCatalogLocationBar>,
		defaultValues: {
			destination: null,
			dates: undefined
		}
	});

	const form = externalForm ?? localForm;

	const handleSubmit = (data: TCatalogLocationBar) => {
		if (onSubmitExternal) {
			onSubmitExternal(data);
			return;
		}

		const query = mapSearchToursToSearchQuery(data as TSearchTours);
		const route = buildRouteWithQuery(ENUM_PATH.TOURS.SEARCH, query);

		navigate(route);
	};

	return (
		<Card>
			<CardContent className="px-4 sm:px-6">
				<Form {...form}>
					<form
						className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_auto_1fr_auto] md:gap-4"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<Controller
							control={form.control}
							name="destination"
							render={({ field, fieldState }) => (
								<div className="mb-0 grid gap-2">
									<label className="text-sm font-medium leading-none">
										{t("search.form.fields.where.label")}
									</label>
									<LocationSuggestSelect
										icon={MapPointIcon}
										value={field.value}
										onChange={field.onChange}
										options={suggestField.options}
										onQueryChange={
											suggestField.onQueryChange
										}
										isLoading={suggestField.isLoading}
										placeholder={t(
											"search.form.fields.where.placeholder"
										)}
										emptyText={t(
											"search.form.fields.where.empty"
										)}
									/>
									{fieldState.error ? (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									) : null}
								</div>
							)}
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
