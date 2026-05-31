import { CONTACT_INFO } from "../model";

export const FooterContact = () => {
	return (
		<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
			<p className="text-base font-medium text-foreground">
				Contact Details
			</p>
			<ul className="flex flex-col gap-3">
				<li>
					<p className="text-base font-normal text-muted-foreground">
						{CONTACT_INFO.address}
					</p>
				</li>
				<li>
					<a
						href={`mailto:${CONTACT_INFO.email}`}
						className="text-base font-normal text-muted-foreground hover:text-foreground"
					>
						{CONTACT_INFO.email}
					</a>
				</li>
				<li>
					<a
						href={`tel:${CONTACT_INFO.phone}`}
						className="text-base font-normal text-muted-foreground hover:text-foreground"
					>
						{CONTACT_INFO.phone}
					</a>
				</li>
			</ul>
		</div>
	);
};
