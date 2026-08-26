import { ChevronRight } from "lucide-react";
import { type FC, Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/shared/lib";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/shared/ui/shadcn-ui";

export type TBreadcrumbPillItem = {
	key: string;
	label: ReactNode;
	to?: string;
	isCurrent: boolean;
};

const pillClassName = (isCurrent: boolean) =>
	cn(
		"inline-flex max-w-[220px] items-center truncate rounded-full border px-3 py-1 text-sm transition-colors",
		isCurrent
			? "border-2 border-foreground font-medium text-foreground"
			: "border-border text-muted-foreground hover:text-foreground"
	);

type TBreadcrumbPillsProps = {
	items: TBreadcrumbPillItem[];
	className?: string;
};

export const BreadcrumbPills: FC<TBreadcrumbPillsProps> = ({
	items,
	className
}) => {
	if (items.length === 0) return null;

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList className="gap-1.5 sm:gap-2">
				{items.map((item, index) => (
					<Fragment key={item.key}>
						{index > 0 && (
							<BreadcrumbSeparator className="[&>svg]:size-3.5 text-muted-foreground">
								<ChevronRight />
							</BreadcrumbSeparator>
						)}
						<BreadcrumbItem className="gap-0">
							{item.isCurrent || !item.to ? (
								<BreadcrumbPage
									className={pillClassName(item.isCurrent)}
								>
									{item.label}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link
										to={item.to}
										className={pillClassName(false)}
									>
										{item.label}
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
