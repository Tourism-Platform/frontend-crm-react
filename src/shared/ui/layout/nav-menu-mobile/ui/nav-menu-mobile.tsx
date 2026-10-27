import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
	Button,
	NAV_RICH_ROW_CLASSNAME,
	NavRichItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Separator
} from "@/shared/ui";

import type { INavItemBase } from "../../nav-menu";

interface INavMenuMobileProps {
	navItems: INavItemBase[];
}

export const NavMenuMobile: FC<INavMenuMobileProps> = ({ navItems }) => {
	const { t } = useTranslation("header");
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					className="group size-8 md:hidden"
					variant="ghost"
					size="icon"
				>
					<svg
						className="pointer-events-none"
						width={16}
						height={16}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 12L20 12"
							className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
						/>
						<path
							d="M4 12H20"
							className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
						/>
						<path
							d="M4 12H20"
							className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
						/>
					</svg>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-72 p-2 md:hidden">
				{navItems.map((link, index) => (
					<div key={link.label}>
						{index > 0 && <Separator className="my-1" />}
						{link.submenu ? (
							<>
								<p className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
									{t(link.label)}
								</p>
								<ul className="flex flex-col gap-0.5">
									{link.items?.map((item) => (
										<li key={item.href}>
											<Link
												to={item.href}
												className={
													NAV_RICH_ROW_CLASSNAME
												}
												onClick={close}
											>
												<NavRichItem
													icon={item.icon}
													title={t(item.label)}
													description={
														item.description &&
														t(item.description)
													}
												/>
											</Link>
										</li>
									))}
								</ul>
							</>
						) : (
							<Link
								to={link.href || "#"}
								className={NAV_RICH_ROW_CLASSNAME}
								onClick={close}
							>
								<NavRichItem title={t(link.label)} />
							</Link>
						)}
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
};
