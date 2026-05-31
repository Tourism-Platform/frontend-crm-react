import { Separator } from "@/shared/ui";

import { FOOTER_SECTIONS } from "./model";
import { FooterLogo, FooterSection, FooterSocial } from "./ui";

export const FooterDefault = () => {
	return (
		<footer className="py-10 bg-accent">
			<div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
				<div className="flex flex-col gap-6 sm:gap-12">
					<div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">
						<div className="col-span-full lg:col-span-4">
							<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
								<FooterLogo />
								<FooterSocial />
							</div>
						</div>

						<div className="col-span-1 lg:block hidden"></div>

						{FOOTER_SECTIONS.map((section, index) => (
							<div key={index} className="col-span-2">
								<FooterSection
									title={section.title}
									links={section.links}
								/>
							</div>
						))}

						{/* contact column removed — sections cover Product / Company / Resources */}
					</div>
					<Separator orientation="horizontal" />
					<p className="text-sm font-normal text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
						© 2026 TourLink. All rights reserved. &nbsp;
						<a href="#" className="hover:text-foreground">
							Privacy
						</a>{" "}
						·{" "}
						<a href="#" className="hover:text-foreground">
							Terms
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};
