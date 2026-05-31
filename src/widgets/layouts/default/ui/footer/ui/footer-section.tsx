import type { TFooterLink } from "../model";

export const FooterSection = ({
	title,
	links
}: {
	title: string;
	links: TFooterLink[];
}) => {
	return (
		<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
			<p className="text-base font-medium text-foreground">{title}</p>
			<ul className="flex flex-col gap-3">
				{links.map((link) => (
					<li key={link.title}>
						<a
							href={link.href}
							className="text-base font-normal text-muted-foreground hover:text-foreground"
						>
							{link.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
