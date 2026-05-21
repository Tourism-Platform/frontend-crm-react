import { Check, Copy } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import { Button } from "@/shared/ui";

interface IStep3Props {
	bookingData?: any;
}

export const Step3Confirmation: FC<IStep3Props> = ({ bookingData }) => {
	const { t } = useTranslation("preview_booking_page");
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center gap-8 w-full py-8">
			<div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
				<Check className="w-8 h-8 text-green-500" />
			</div>

			<div className="text-center flex flex-col gap-2">
				<h2 className="text-2xl font-bold">
					{t("step_3.success_title")}
				</h2>
				<p className="text-muted-foreground text-sm max-w-md mx-auto">
					{t("step_3.success_desc")}{" "}
					<span className="text-primary font-medium">
						sample@gmail.com
					</span>
				</p>
			</div>

			<div className="bg-slate-50 border rounded-full px-6 py-3 flex items-center gap-3">
				<span className="text-sm font-medium text-muted-foreground">
					{t("step_3.booking_id")}
				</span>
				<span className="font-bold">
					{bookingData?.booking_id || "RQA-123456"}
				</span>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-6 w-6"
				>
					<Copy className="w-3 h-3 text-muted-foreground" />
				</Button>
			</div>

			<div className="w-full max-w-md bg-white border rounded-xl p-6 mt-4">
				<div className="flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-[1px] before:bg-border">
					{Object.keys(
						t("step_3.timeline", { returnObjects: true }) as any
					).map((key, i) => (
						<div key={key} className="flex gap-4 relative z-10">
							<div
								className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white border ${i === 0 ? "border-green-500 text-green-500" : "border-border text-muted-foreground"}`}
							>
								{i === 0 ? (
									<Check className="w-3 h-3" />
								) : (
									<div className="w-1.5 h-1.5 rounded-full bg-current" />
								)}
							</div>
							<div className="flex flex-col gap-1 pt-1">
								<p className="text-sm font-semibold">
									{t(`step_3.timeline.${key}.title` as any)}
								</p>
								<p className="text-xs text-muted-foreground">
									{t(`step_3.timeline.${key}.desc` as any)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center gap-4 mt-8">
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate(ENUM_PATH.TOURS.CATALOG.ROOT)}
				>
					{t("step_3.view_my_bookings")}
				</Button>
				<Button
					type="button"
					className="bg-blue-400 hover:bg-blue-500 text-white"
					onClick={() => navigate(ENUM_PATH.TOURS.CATALOG.ROOT)}
				>
					{t("step_3.catalogue")}
				</Button>
			</div>
		</div>
	);
};
