// import { Loader, LogOutIcon } from "lucide-react";
import { Loader, LogOutIcon } from "lucide-react";
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
	DropdownMenuTrigger,
	Skeleton
} from "@/shared/ui";

import { useGetAccountQuery } from "@/entities/user";

import { useSignOutAction } from "@/features/auth";

import { AGENCY_USER_MENU_LIST } from "../model";

export const AgencyUserMenu: FC = () => {
	const { t } = useTranslation("sidebar");
	const { handleSignOut, isLoading } = useSignOutAction();
	const { data: accountData, isLoading: isAccountLoading } =
		useGetAccountQuery();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto p-0 hover:bg-transparent"
				>
					<Avatar className="cursor-pointer">
						<AvatarImage src="./avatar.jpg" alt="Profile image" />
						<AvatarFallback>
							{isAccountLoading ? (
								<Skeleton className="size-4" />
							) : (
								<>
									{accountData?.first_name?.[0]}
									{accountData?.last_name?.[0]}
								</>
							)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64" align="end">
				<DropdownMenuLabel className="flex min-w-0 flex-col gap-1">
					<span className="text-foreground truncate text-sm font-medium line-clamp-1">
						{isAccountLoading ? (
							<Skeleton className="size-5 w-3/4" />
						) : (
							<>
								{accountData?.first_name}{" "}
								{accountData?.last_name}
							</>
						)}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{isAccountLoading ? (
							<Skeleton className="size-4 w-1/2" />
						) : (
							// accountData?.email
							"example@gmail.com"
						)}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{AGENCY_USER_MENU_LIST.map((menuGroup, index) => (
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
				<DropdownMenuItem onClick={handleSignOut}>
					{isLoading ? (
						<Loader className="size-4 animate-spin text-muted-foreground" />
					) : (
						<LogOutIcon
							className="opacity-60 size-4"
							aria-hidden="true"
						/>
					)}
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
