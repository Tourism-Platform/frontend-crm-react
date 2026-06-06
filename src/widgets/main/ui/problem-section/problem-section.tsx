import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";

import { SectionHeader } from "../section-header";

import { ProblemVisual } from "./problem-tourlink-visual";

/* LEGACY — старый контент секции (текст + chat-bubbles)
import { X } from "lucide-react";
import { cn } from "@/shared/lib";
import type { TProblemMessage } from "../../model";

const MESSAGE_VARIANTS: Record<TProblemMessage["variant"], string> = {
	default: "border-border/80 bg-card text-foreground",
	warning: "border-destructive/20 bg-destructive/5 text-destructive",
	success: "border-border/80 bg-card text-foreground"
};
*/

export const ProblemSection: FC = () => {
	const { t } = useTranslation("main");

	return (
		<section className="bg-background px-4 py-16">
			<SectionHeader
				eyebrow={t("problem.eyebrow")}
				title={t("problem.title")}
				subtitle={t("problem.subtitle")}
			/>

			<Card className="mx-auto max-w-5xl overflow-hidden p-0">
				<CardContent className="p-0">
					<ProblemVisual />
				</CardContent>
			</Card>

			{/* LEGACY
			const tools = t("problem.tools", { returnObjects: true }) as string[];
			const messages = t("problem.visual.messages", {
				returnObjects: true
			}) as TProblemMessage[];
			const paragraphs = t("problem.card.paragraphs", {
				returnObjects: true
			}) as string[];

			<CardContent className="grid gap-8 lg:grid-cols-2 px-10">
				<div className="space-y-4">
					<h3 className="text-2xl font-bold">
						{t("problem.card.title")}
					</h3>
					{paragraphs.map((paragraph) => (
						<p
							key={paragraph}
							className="text-muted-foreground leading-relaxed"
						>
							{paragraph}
						</p>
					))}
					<div className="flex flex-wrap gap-2">
						{tools.map((tool) => (
							<span
								key={tool}
								className="inline-flex items-center gap-1 rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
							>
								<X className="size-3" />
								{tool}
							</span>
						))}
					</div>
				</div>

				<div className="relative grid min-h-56 content-center gap-4 rounded-xl bg-muted/40 p-10">
					{messages.map((message, index) => (
						<div
							className={cn(
								"flex",
								index % 2 === 0
									? "justify-start"
									: "justify-end"
							)}
						>
							<div
								key={message.text}
								className={cn(
									"rounded-lg border px-3 py-2 text-xs shadow-sm",
									MESSAGE_VARIANTS[message.variant]
								)}
							>
								{message.text}
							</div>
						</div>
					))}
				</div>
			</CardContent>
			*/}
		</section>
	);
};
