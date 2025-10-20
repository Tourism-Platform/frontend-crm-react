import { Plane } from "lucide-react";
import { type FC } from "react";

import { Card, CardContent, CardHeader, Separator } from "@/shared/ui";

export const FlightPreview: FC = () => {
	const flight = {
		flightNumber: "HY-1234",
		departureDate: "19 sep, 2026",
		returnDate: "20 sep, 2026",
		departureCode: "LHY",
		arrivalCode: "TAS",
		departureTime: "22:15 PM",
		arrivalTime: "09:00 AM",
		departureAirport: "London Heathrow Airport",
		departureTerminal: "4",
		departureGate: "12",
		arrivalAirport: "Tashkent Airport",
		arrivalTerminal: "2",
		arrivalGate: "1"
	};
	return (
		<Card className="gap-5">
			{/* Header */}
			<CardHeader className="flex items-center gap-3">
				<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
					<Plane className="w-4 h-4 text-white" />
				</div>
				<div>
					<p className="font-semibold ">
						{flight.departureAirport.split(" ")[0]} to{" "}
						{flight.arrivalAirport.split(" ")[0]}
					</p>
					<span className="text-sm text-gray-500">
						{flight.flightNumber} • {flight.departureDate} -{" "}
						{flight.returnDate}
					</span>
				</div>
			</CardHeader>
			<div className="px-6">
				<Separator />
			</div>
			<CardContent>
				<div className="grid grid-cols-[max-content_1fr_max-content] items-center justify-between gap-2">
					{/* Departure */}
					<div className="grid gap-4">
						<p className="text-xl font-bold ">
							{flight.departureCode}
						</p>
						<div>
							<p className="text-2xl font-semibold ">
								{flight.departureTime}
							</p>
							<p className="mt-2 text-sm text-gray-600">
								{flight.departureAirport}
							</p>
							<span className="mt-1 text-sm text-gray-500">
								Terminal {flight.departureTerminal} • Gate{" "}
								{flight.departureGate}
							</span>
						</div>
					</div>

					<div className="flex items-center">
						<Separator className="shrink-1" />
						<div className="px-8">
							<Plane className="w-6 h-6 text-gray-400 rotate-45" />
						</div>
						<Separator className="shrink-1" />
					</div>

					{/* Arrival */}
					<div className="text-right grid gap-4">
						<p className="text-xl font-bold ">
							{flight.arrivalCode}
						</p>
						<div>
							<p className="text-2xl font-semibold ">
								{flight.arrivalTime}
							</p>
							<p className="mt-2 text-sm text-gray-600">
								{flight.arrivalAirport}
							</p>
							<span className="mt-1 text-sm text-gray-500">
								Terminal {flight.arrivalTerminal} • Gate{" "}
								{flight.arrivalGate}
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
