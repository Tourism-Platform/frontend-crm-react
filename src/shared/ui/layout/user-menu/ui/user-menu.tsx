// import { Loader, LogOutIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/shared/ui";

// import { useSignOutAction } from "@/features/auth";

import { USER_MENU_LIST } from "../model";

export const UserMenu: FC = () => {
	const { t } = useTranslation("sidebar");
	// const { handleSignOut, isLoading } = useSignOutAction();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto p-0 hover:bg-transparent"
				>
					<Avatar className="cursor-pointer">
						<AvatarImage src="./avatar.jpg" alt="Profile image" />
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64" align="end">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						Keith Kennedy
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						k.kennedy@originui.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{USER_MENU_LIST.map((menuGroup, index) => (
					<DropdownMenuGroup key={index}>
						{menuGroup.menu?.map((menuItem) => (
							<DropdownMenuItem key={menuItem.label} asChild>
								<Link
									to={menuItem.path}
									className="text-muted-foreground hover:text-foreground"
								>
									{menuItem.icon && (
										<menuItem.icon className="w-3 h-3" />
									)}
									<span>{t(menuItem.label)}</span>
								</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
					</DropdownMenuGroup>
				))}
				{/* <DropdownMenuItem onClick={handleSignOut}>
					{isLoading ? (
						<Loader className="size-4 animate-spin text-muted-foreground" />
					) : (
						<LogOutIcon
							className="opacity-60 size-4"
							aria-hidden="true"
						/>
					)}
					<span>Logout</span>
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
