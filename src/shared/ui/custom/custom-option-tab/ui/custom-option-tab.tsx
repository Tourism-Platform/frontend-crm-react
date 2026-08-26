import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

const TabsValueContext = React.createContext<string | undefined>(undefined);

const tabVariants = cva("cursor-pointer", {
	variants: {
		variant: {
			default:
				"relative z-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none active:translate-y-px data-[state=active]:translate-y-0 disabled:active:translate-y-0",
			tongue: "data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-accent/50 pl-4 py-2 rounded-t-lg rounded-b-none border-b-2 transition-all border-transparent text-muted-foreground hover:!bg-accent hover:!text-accent-foreground hover:!border-primary",
			outline:
				"first:rounded-l-lg last:rounded-r-lg rounded-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-accent/50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			bigOutline:
				"rounded-lg data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-accent/50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

type TTabTriggerInfo = {
	value: string;
	variant?: string | null;
};

const collectTabTriggers = (children: React.ReactNode): TTabTriggerInfo[] => {
	const triggers: TTabTriggerInfo[] = [];

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) {
			return;
		}

		const props = child.props as {
			value?: string;
			variant?: string | null;
			children?: React.ReactNode;
		};

		if (typeof props.value === "string") {
			triggers.push({ value: props.value, variant: props.variant });
			return;
		}

		if (props.children) {
			triggers.push(...collectTabTriggers(props.children));
		}
	});

	return triggers;
};

const isDefaultTriggerVariant = (variant?: string | null) =>
	!variant || variant === "default";

export const CustomOptionTabs = React.forwardRef<
	React.ComponentRef<typeof Tabs>,
	React.ComponentPropsWithoutRef<typeof Tabs>
>(({ className, value, ...props }, ref) => (
	<TabsValueContext.Provider value={value}>
		<Tabs ref={ref} className={cn(className)} value={value} {...props} />
	</TabsValueContext.Provider>
));
CustomOptionTabs.displayName = "CustomOptionTabs";

export const CustomOptionTabsList = React.forwardRef<
	React.ComponentRef<typeof TabsList>,
	React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, children, style, ...props }, ref) => {
	const activeValue = React.useContext(TabsValueContext);
	const triggers = collectTabTriggers(children);
	const tabValues = triggers.map((trigger) => trigger.value);
	const tabCount = tabValues.length;
	const hasSlidingIndicator =
		tabCount > 0 &&
		triggers.every((trigger) => isDefaultTriggerVariant(trigger.variant));
	const activeIndex = Math.max(0, tabValues.indexOf(activeValue ?? ""));

	return (
		<TabsList
			ref={ref}
			className={cn(
				"grid bg-transparent",
				hasSlidingIndicator &&
					"relative isolate rounded-lg bg-muted p-0.5",
				className
			)}
			style={style}
			{...props}
		>
			{hasSlidingIndicator && (
				<span
					aria-hidden
					className="pointer-events-none absolute top-0.5 left-0.5 z-0 h-[calc(100%-0.25rem)] rounded-md bg-primary shadow-xs transition-transform duration-250 ease-out"
					style={{
						width: `calc((100% - 0.25rem) / ${tabCount})`,
						transform: `translateX(calc(${activeIndex} * 100%))`
					}}
				/>
			)}
			{children}
		</TabsList>
	);
});
CustomOptionTabsList.displayName = "CustomOptionTabsList";

type TCustomOptionTabsTriggerProps = React.ComponentPropsWithoutRef<
	typeof TabsTrigger
> &
	VariantProps<typeof tabVariants>;

export const CustomOptionTabsTrigger = React.forwardRef<
	React.ComponentRef<typeof TabsTrigger>,
	TCustomOptionTabsTriggerProps
>(({ variant, className, ...props }, ref) => (
	<TabsTrigger
		ref={ref}
		className={cn(tabVariants({ variant }), className)}
		{...props}
	/>
));
CustomOptionTabsTrigger.displayName = "CustomOptionTabsTrigger";

export const CustomOptionTabsContent = React.forwardRef<
	React.ComponentRef<typeof TabsContent>,
	React.ComponentPropsWithoutRef<typeof TabsContent>
>(({ className, ...props }, ref) => (
	<TabsContent
		ref={ref}
		className={cn("outline-none", className)}
		{...props}
	/>
));
CustomOptionTabsContent.displayName = "CustomOptionTabsContent";
