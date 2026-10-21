import { type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { Button, Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { TOUR_PACKAGE_CREATE_ID, useListPackagesQuery } from "@/entities/tour";

import { PRICING_REVIEW_PACKAGE_COLUMNS } from "../model";

interface IPricingReviewPackagesTableProps {
	tourId: string;
	optionId: string;
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const PricingReviewPackagesTableBase: FC<IPricingReviewPackagesTableProps> = ({
	tourId,
	optionId
}) => {
	const { t } = useTranslation("tour_pricing_review_page");
	const [search, setSearch] = useState("");

	const {
		data: packages = [],
		isLoading,
		isFetching,
		isRealError
	} = useOptionalResourceQuery(
		useListPackagesQuery(
			{ tourId, optionId, search },
			{ skip: !tourId || !optionId }
		)
	);

	useEffect(() => {
		if (isRealError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		setSearch("");
	}, [optionId]);

	const columns = useMemo(
		() => PRICING_REVIEW_PACKAGE_COLUMNS(t, { tourId, optionId }),
		[t, tourId, optionId]
	);

	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: 0,
			pageSize: Math.max(packages.length, 10)
		}),
		[packages.length]
	);

	const actionsJsx = useMemo(
		() => (
			<Button variant="default" asChild>
				<Link
					to={buildRoute(ENUM_PATH.TOURS.PACKAGE, {
						tourId,
						optionId,
						packageId: TOUR_PACKAGE_CREATE_ID
					})}
				>
					{t("table.buttons.create_package")}
				</Link>
			</Button>
		),
		[t, tourId, optionId]
	);

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={packages}
					columns={columns}
					actions={actionsJsx}
					isLoading={isLoading || isFetching}
					loadingMode="skeleton"
					tableLayout={TABLE_LAYOUT}
					showPagination={false}
					pagination={pagination}
					showStatusFilter={false}
					showVisibilityFilter={false}
					search={search}
					onSearchChange={setSearch}
					minSearchLength={1}
				/>
			</CardContent>
		</Card>
	);
};

export const PricingReviewPackagesTable = withErrorBoundary(
	PricingReviewPackagesTableBase
);
