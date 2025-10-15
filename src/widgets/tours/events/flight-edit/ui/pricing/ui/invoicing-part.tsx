import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TPricingSchema } from "../model";

export interface IInvoicingPartProps {
	form: UseFormReturn<TPricingSchema>;
}

export const InvoicingPart: FC<IInvoicingPartProps> = () => {
	return <div>InvoicingPart</div>;
};
