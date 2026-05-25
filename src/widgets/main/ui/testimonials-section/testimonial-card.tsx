import type { FC } from "react";

import { Card, CardContent, CardHeader } from "@/shared/ui";

interface ITestimonialCardProps {
	tag: string;
	quote: string;
	name: string;
	role: string;
}

export const TestimonialCard: FC<ITestimonialCardProps> = ({
	tag,
	quote,
	name,
	role
}) => (
	<Card className="flex h-full flex-col">
		<CardHeader className="space-y-3">
			<span className="w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
				{tag}
			</span>
			<p className="text-sm italic leading-relaxed text-muted-foreground">
				&ldquo;{quote}&rdquo;
			</p>
		</CardHeader>
		<CardContent className="mt-auto flex items-center gap-3 border-t pt-4">
			<div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
				{name[0]}
			</div>
			<div>
				<p className="text-sm font-semibold">{name}</p>
				<p className="text-xs text-muted-foreground">{role}</p>
			</div>
		</CardContent>
	</Card>
);
