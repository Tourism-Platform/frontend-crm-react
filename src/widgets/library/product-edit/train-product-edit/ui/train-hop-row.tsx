import { Trash2 } from "lucide-react";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { Button, CustomField } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP,
	type TTrainProductGeneralSchema
} from "@/entities/supplier";

import { TRAIN_HOP_FIELDS_LIST } from "../model";

interface ITrainHopRowProps {
	form: UseFormReturn<TTrainProductGeneralSchema>;
	index: number;
	language: ENUM_LANGUAGES_TYPE;
	canRemove: boolean;
	onRemove: () => void;
}

export const TrainHopRow: FC<ITrainHopRowProps> = ({
	form,
	index,
	language,
	canRemove,
	onRemove
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const departureGeo = useGeoSearchFieldProps(language);
	const arrivalGeo = useGeoSearchFieldProps(language);

	useGeoFormFieldEnrichment({
		form,
		name: `${ENUM_FORM.HOPS}.${index}.${ENUM_HOP.DEPARTURE_LOCATION}` as const,
		language
	});
	useGeoFormFieldEnrichment({
		form,
		name: `${ENUM_FORM.HOPS}.${index}.${ENUM_HOP.ARRIVAL_LOCATION}` as const,
		language
	});

	return (
		<div className="grid gap-3 rounded-md border p-4 md:grid-cols-2">
			{TRAIN_HOP_FIELDS_LIST({
				departure: departureGeo,
				arrival: arrivalGeo
			}).map(({ key, ...item }) => (
				<CustomField
					key={key}
					control={form.control}
					name={`${ENUM_FORM.HOPS}.${index}.${key}`}
					t={t}
					{...item}
				/>
			))}
			{canRemove ? (
				<div className="md:col-span-2 flex justify-end">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={onRemove}
					>
						<Trash2 className="mr-1 h-4 w-4" />
					</Button>
				</div>
			) : null}
		</div>
	);
};
