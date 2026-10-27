import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui/shadcn-ui/skeleton";

interface ICustomFieldPreviewSkeletonProps {
	/** Скелетон значения; по умолчанию — строка текста как у value (24px) */
	children?: ReactNode;
	className?: string;
}

/** Повторяет раскладку CustomFieldPreview: подпись 16px + gap-1 + значение */
export const CustomFieldPreviewSkeleton: FC<
	ICustomFieldPreviewSkeletonProps
> = ({ children, className }) => (
	<div className={cn("flex flex-col gap-1", className)}>
		<Skeleton className="h-4 w-20" />
		{children ?? <Skeleton className="h-6 w-3/4" />}
	</div>
);
