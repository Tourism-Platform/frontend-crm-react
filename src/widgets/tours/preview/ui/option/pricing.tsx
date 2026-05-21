import { Info } from "lucide-react";
import { type FC } from "react";

import { Separator } from "@/shared/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/shared/ui/shadcn-ui/accordion";

export const Pricing: FC = () => {
	return (
		<div className="flex flex-col w-full py-2">
			<h2 className="text-2xl font-bold mb-6">Pricing Breakdown</h2>

			<div className="flex items-center justify-between mb-8">
				<span className="font-semibold text-base">Total price</span>
				<div className="flex flex-col items-end gap-1">
					<div className="flex items-center gap-2">
						<Info className="w-4 h-4 text-muted-foreground" />
						<span className="font-bold text-base">
							$983.00-$1,112.00
						</span>
					</div>
					<span className="text-sm text-muted-foreground">
						Est. per person cost
					</span>
				</div>
			</div>

			<h3 className="text-xl font-bold mb-4">Details</h3>
			<Separator className="mb-2" />

			<Accordion type="multiple" className="w-full">
				<AccordionItem value="accomodation" className="border-b">
					<AccordionTrigger className="hover:no-underline font-semibold text-base">
						Accomodation
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-2 pb-4">
						<p className="text-sm">
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Holiday hotel
							</a>{" "}
							or{" "}
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Hyatt resort
							</a>{" "}
							or{" "}
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Uzbekistan hotel
							</a>
						</p>
						<p className="text-sm">
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Holiday hotel
							</a>{" "}
							or{" "}
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Hyatt resort
							</a>{" "}
							or{" "}
							<a
								href="#"
								className="underline font-medium hover:text-primary"
							>
								Uzbekistan hotel
							</a>
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="activity" className="border-b">
					<AccordionTrigger className="hover:no-underline font-semibold text-base">
						Activity
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-2 pb-4">
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Activity #1
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Activity #2
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Activity #3
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Activity #4
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Activity #5
						</a>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="transportation" className="border-b">
					<AccordionTrigger className="hover:no-underline font-semibold text-base">
						Transportation
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-2 pb-4">
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transportation to Bukhara by train
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transportation to Tashkent by train
						</a>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem
					value="transfer"
					className="border-b border-b-transparent"
				>
					<AccordionTrigger className="hover:no-underline font-semibold text-base">
						Transfer
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-2 pb-4">
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transfer to Hotel
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transfer to dinner
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transfer tour city
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transfer to Hotel
						</a>
						<a
							href="#"
							className="text-sm underline font-medium hover:text-primary w-fit"
						>
							Transfer to Lunch
						</a>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
