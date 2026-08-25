import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, ScrollArea } from "@/shared/ui";

import type { TSupplierProduct } from "@/entities/supplier";

interface IProductListProps {
	products: TSupplierProduct[];
	selectedProductId: string | null;
	isFetching: boolean;
	isError: boolean;
	onSelect: (productId: string) => void;
	onRetry: () => void;
}

export const ProductList: FC<IProductListProps> = ({
	products,
	selectedProductId,
	isFetching,
	isError,
	onSelect,
	onRetry
}) => {
	const { t } = useTranslation("common_events");

	return (
		<div className="grid gap-2">
			{isError ? (
				<div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
					<span>{t("attach_product.dialog.load_error")}</span>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onRetry}
					>
						{t("attach_product.dialog.retry")}
					</Button>
				</div>
			) : null}

			<ScrollArea className="h-64 rounded-md border">
				<div className="grid gap-1 p-2">
					{isFetching && !products.length ? (
						<div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
							<Loader className="h-4 w-4 animate-spin" />
							{t("attach_product.dialog.loading")}
						</div>
					) : null}
					{!isFetching && !products.length ? (
						<p className="p-6 text-center text-sm text-muted-foreground">
							{t("attach_product.dialog.empty")}
						</p>
					) : null}
					{products.map((product) => {
						const isSelected = product.id === selectedProductId;

						return (
							<button
								key={product.id}
								type="button"
								className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
									isSelected
										? "bg-primary text-primary-foreground"
										: "hover:bg-muted"
								}`}
								onClick={() => onSelect(product.id)}
							>
								<p className="font-medium">{product.name}</p>
							</button>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};
