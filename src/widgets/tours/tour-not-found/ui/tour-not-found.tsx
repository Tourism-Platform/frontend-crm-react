import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

import { TourNotFoundCard } from "@/entities/tour";

export const TourNotFound: FC = () => {
	const { t } = useTranslation("tours_page");

	return (
		<div className="px-5 mb-30 h-full">
			<div className="flex flex-col gap-6 font-poppins h-[60vh] items-center justify-center">
				<TourNotFoundCard />
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-primary"
				>
					<Link to={ENUM_PATH.TOURS.ROOT}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
			</div>
		</div>
	);
};
