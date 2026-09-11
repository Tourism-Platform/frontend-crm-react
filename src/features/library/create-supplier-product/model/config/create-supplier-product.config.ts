import {
	BusIcon,
	DrivingIcon,
	HouseIcon,
	PlaneIcon,
	TicketStarIcon,
	TrainIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";

import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";

import type { ICreateSupplierProductOption } from "../types";

export const CREATE_SUPPLIER_PRODUCT_OPTIONS: ICreateSupplierProductOption[] = [
	{
		type: ENUM_SUPPLIER_TYPE.HOTEL,
		title: "products.create.hotel.title",
		description: "products.create.hotel.description",
		icon: HouseIcon,
		iconBgClassName: "bg-cyan-700",
		path: ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT
	},
	{
		type: ENUM_SUPPLIER_TYPE.TRAIN,
		title: "products.create.train.title",
		description: "products.create.train.description",
		icon: TrainIcon,
		iconBgClassName: "bg-indigo-600",
		path: ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT
	},
	{
		type: ENUM_SUPPLIER_TYPE.FLIGHT,
		title: "products.create.flight.title",
		description: "products.create.flight.description",
		icon: PlaneIcon,
		iconBgClassName: "bg-blue-600",
		path: ENUM_PATH.LIBRARY.SUPPLIER_FLIGHT_PRODUCT
	},
	{
		type: ENUM_SUPPLIER_TYPE.BUS,
		title: "products.create.bus.title",
		description: "products.create.bus.description",
		icon: BusIcon,
		iconBgClassName: "bg-violet-600",
		path: ENUM_PATH.LIBRARY.SUPPLIER_BUS_PRODUCT
	},
	{
		type: ENUM_SUPPLIER_TYPE.TRANSFER,
		title: "products.create.transfer.title",
		description: "products.create.transfer.description",
		icon: DrivingIcon,
		iconBgClassName: "bg-emerald-600",
		path: ENUM_PATH.LIBRARY.SUPPLIER_TRANSFER_PRODUCT
	},
	{
		type: ENUM_SUPPLIER_TYPE.ACTIVITY,
		title: "products.create.activity.title",
		description: "products.create.activity.description",
		icon: TicketStarIcon,
		iconBgClassName: "bg-sky-500",
		path: ENUM_PATH.LIBRARY.SUPPLIER_ACTIVITY_PRODUCT
	}
];
