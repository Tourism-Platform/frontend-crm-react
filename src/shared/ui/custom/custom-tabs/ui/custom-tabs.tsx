import * as React from "react";

import { cn } from "@/shared/lib";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

export const CustomTabs = React.forwardRef<
	React.ComponentRef<typeof Tabs>,
	React.ComponentPropsWithoutRef<typeof Tabs>
>(({ className, ...props }, ref) => (
	<Tabs ref={ref} className={cn("", className)} {...props} />
));
CustomTabs.displayName = "CustomTabs";

export const CustomTabsList = React.forwardRef<
	React.ComponentRef<typeof TabsList>,
	React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, children, ...props }, ref) => {
	const count = React.Children.count(children);
	console.log(count);
	return (
		<TabsList
			ref={ref}
			className={cn(
				"grid bg-transparent",
				`grid-cols-${count}`,
				className
			)}
			{...props}
		>
			{children}
		</TabsList>
	);
});
CustomTabsList.displayName = "CustomTabsList";

export const CustomTabsTrigger = React.forwardRef<
	React.ComponentRef<typeof TabsTrigger>,
	React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
	<TabsTrigger
		ref={ref}
		className={cn(
			"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg",
			className
		)}
		{...props}
	/>
));
CustomTabsTrigger.displayName = "CustomTabsTrigger";

export const CustomTabsContent = React.forwardRef<
	React.ComponentRef<typeof TabsContent>,
	React.ComponentPropsWithoutRef<typeof TabsContent>
>(({ className, ...props }, ref) => (
	<TabsContent ref={ref} className={cn("", className)} {...props} />
));
CustomTabsContent.displayName = "CustomTabsContent";
