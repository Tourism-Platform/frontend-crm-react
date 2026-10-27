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
		"inline-flex max-w-[220px] items-center gap-1.5 truncate rounded-full border px-3 py-1 text-sm shadow-xs outline-none transition-[color,background-color,box-shadow,border-color] duration-150 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
		isCurrent
			? "border-primary/30 bg-secondary font-medium text-primary shadow-sm shadow-primary/10 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']"
			: "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
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
							<BreadcrumbSeparator className="text-primary/40 [&>svg]:size-3.5">
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
