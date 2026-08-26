import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomUploadImages,
	SelectPicker,
	withErrorBoundary
} from "@/shared/ui";

import type { IHotelVariant } from "@/entities/supplier";

import { useHotelProductImages } from "../model";

interface IHotelProductImagesProps {
	supplierId: string;
	productId: string;
	variants?: IHotelVariant[];
	disabled?: boolean;
}

const HotelProductImagesBase: FC<IHotelProductImagesProps> = ({
	supplierId,
	productId,
	variants = [],
	disabled = false
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const {
		productUpload,
		nodeUpload,
		roomsWithId,
		selectedRoomKey,
		setSelectedRoomKey
	} = useHotelProductImages({
		supplierId,
		productId,
		variants,
		disabled
	});

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-8">
			<div className="grid gap-4">
				<h3 className="text-base font-medium">
					{t("form.images.product_title")}
				</h3>
				<CustomUploadImages
					items={productUpload.items}
					onAdd={productUpload.handleAdd}
					onRemove={productUpload.handleRemove}
					onReorder={productUpload.handleReorder}
					maxFiles={10}
				/>
				<div className="flex justify-end">
					<Button
						size="lg"
						type="button"
						onClick={productUpload.handlePhotosSubmit}
						disabled={productUpload.isLoading}
					>
						{productUpload.isLoading ? (
							<>
								<Loader className="mr-2 h-4 w-4 animate-spin" />
								{t("form.images.buttons.saving")}
							</>
						) : (
							t("form.images.buttons.save")
						)}
					</Button>
				</div>
			</div>

			{roomsWithId.length ? (
				<div className="grid gap-4">
					<h3 className="text-base font-medium">
						{t("form.images.node_title")}
					</h3>
					<SelectPicker
						options={roomsWithId.map((room) => ({
							value: `${room.variantId}:${room.roomId}`,
							label: `${room.variantName} · ${room.roomTyp ?? room.roomId}`
						}))}
						value={selectedRoomKey}
						onChange={setSelectedRoomKey}
						placeholder={t("form.images.select_room")}
					/>
					<CustomUploadImages
						items={nodeUpload.items}
						onAdd={nodeUpload.handleAdd}
						onRemove={nodeUpload.handleRemove}
						onReorder={nodeUpload.handleReorder}
						maxFiles={5}
					/>
					<div className="flex justify-end">
						<Button
							size="lg"
							type="button"
							onClick={nodeUpload.handlePhotosSubmit}
							disabled={nodeUpload.isLoading}
						>
							{nodeUpload.isLoading ? (
								<>
									<Loader className="mr-2 h-4 w-4 animate-spin" />
									{t("form.images.buttons.saving")}
								</>
							) : (
								t("form.images.buttons.save")
							)}
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
};

export const HotelProductImages = withErrorBoundary(HotelProductImagesBase);
