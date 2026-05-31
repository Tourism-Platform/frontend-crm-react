import { InstagramIcon, LinkedinIcon, Send, TwitterIcon } from "lucide-react";

export const FooterSocial = ({ className }: { className?: string }) => {
	return (
		<div className={className + " flex items-center gap-4"}>
			<a href="#" className="text-muted-foreground hover:text-foreground">
				<TwitterIcon />
			</a>
			<a href="#" className="text-muted-foreground hover:text-foreground">
				<LinkedinIcon />
			</a>
			<a href="#" className="text-muted-foreground hover:text-foreground">
				<Send />
			</a>
			<a href="#" className="text-muted-foreground hover:text-foreground">
				<InstagramIcon />
			</a>
		</div>
	);
};
