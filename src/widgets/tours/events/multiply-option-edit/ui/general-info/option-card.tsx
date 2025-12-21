import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";

import {
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormField,
	FormItem
} from "@/shared/ui";

import { type TGeneralInfoSchema } from "../../model";

interface IOptionCardProps {
	form: UseFormReturn<TGeneralInfoSchema>;
	index: number;
}

export const OptionCard: FC<IOptionCardProps> = ({ form, index }) => {
	const name = form.watch(`options.${index}.name`);
	const checked = form.watch(`options.${index}.checked`);

	const handleToggle = () => {
		form.setValue(`options.${index}.checked`, !checked, {
			shouldDirty: true,
			shouldTouch: true
		});
	};

	return (
		<Card
			className="cursor-pointer transition-colors hover:bg-muted/50"
			onClick={handleToggle}
		>
			<CardContent className="flex items-center justify-between">
				<p className="text-sm font-medium">{name}</p>
				<FormField
					control={form.control}
					name={`options.${index}.checked`}
					render={({ field }) => (
						<FormItem onClick={(e) => e.stopPropagation()}>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};
