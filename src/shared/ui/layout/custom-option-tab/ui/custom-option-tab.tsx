import { cn } from "@/shared/lib";

export function CustomOptionTab({
	className,
	isActive,
	...props
}: React.ComponentProps<"div"> & { isActive?: boolean }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"pl-4 py-2 rounded-t-lg border-b-2 transition-all cursor-pointer border-transparent text-muted-foreground  hover:bg-accent hover:text-accent-foreground hover:border-primary",
				isActive && "border-primary text-primary bg-accent/50",
				className
			)}
			{...props}
		/>
	);
}
