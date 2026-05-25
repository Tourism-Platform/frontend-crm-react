import type { FC } from "react";

interface IStepCardProps {
	step: number;
	title: string;
	desc: string;
}

export const StepCard: FC<IStepCardProps> = ({ step, title, desc }) => (
	<div className="rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-md">
		<div className="mb-4 flex size-8 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground">
			{step}
		</div>
		<h4 className="text-lg font-semibold">{title}</h4>
		<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
			{desc}
		</p>
	</div>
);
