import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import {
	type TGeneralInfoSchema,
	TRANSPORTATION_EDIT_SUBTABS_LIST
} from "../../model";

import { FlightPreview } from "./flight-preview";
import { TransportationForm } from "./transportation-form";

interface ITransportationInfoProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const TransportationInfo: FC<ITransportationInfoProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	// 👇 Подключаем useFieldArray для массива transportation
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "transportation" // имя массива в твоей схеме
	});

	const handleAddFlight = () => {
		append({});
	};

	return (
		<div className="grid gap-8">
			<div className="grid gap-6">
				<h2 className="text-xl">{t("general.subtype.title")}</h2>

				<CustomOptionTabs
					defaultValue={TRANSPORTATION_EDIT_SUBTABS_LIST[0]?.type}
				>
					<CustomOptionTabsList className="grid-cols-3 gap-5">
						{TRANSPORTATION_EDIT_SUBTABS_LIST.map((item) => (
							<CustomOptionTabsTrigger
								key={item.type}
								value={item.type}
								variant={"bigOutline"}
								className="grid gap-2 p-5 items-center justify-center w-50"
							>
								<div className="flex items-center justify-center">
									<item.icon className="h-5" />
								</div>
								<p>{t(item?.label)}</p>
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
				</CustomOptionTabs>

				<CustomField
					control={form?.control}
					name="subtype"
					t={t}
					fieldType="input"
					label="general.subtype.form.fields.supplier.label"
					placeholder="general.subtype.form.fields.supplier.placeholder"
				/>
			</div>

			<Separator className="mb-4" />

			<div className="grid gap-4">
				{!!fields.length && <FlightPreview />}
				{fields.map((field, index) => (
					<TransportationForm
						key={field.id}
						form={form}
						onRemove={() => remove(index)} // если нужно убирать сегмент
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddFlight}
					>
						<p>{t("general.transportation.buttons.add")}</p>
						<PlusIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
