import { Loader, LogOutIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { USER_ROLE_LABELS } from "@/shared/config";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	NAV_RICH_ROW_CLASSNAME,
	NavRichItem,
	Skeleton
} from "@/shared/ui";

import { useGetAuthAccountQuery } from "@/entities/auth";
import { useGetAccountQuery } from "@/entities/user";

import { useSignOutAction } from "@/features/auth";

import { OPERATOR_USER_MENU_LIST } from "../model";

export const OperatorUserMenu: FC = () => {
	const { t } = useTranslation(["sidebar", "options"]);
	const { handleSignOut, isLoading } = useSignOutAction();
	const { data: accountData, isLoading: isAccountLoading } =
		useGetAccountQuery();

	const { data: authAccount, isLoading: isAuthAccountLoading } =
		useGetAuthAccountQuery();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto p-0 hover:bg-transparent"
				>
					<Avatar className="cursor-pointer">
						<AvatarImage
							src={accountData?.avatar}
							alt="Profile image"
						/>
						<AvatarFallback>
							{isAccountLoading ? (
								<Skeleton className="size-4" />
							) : (
								<>
									{accountData?.first_name &&
									accountData?.last_name
										? `${accountData?.first_name?.[0]} ${accountData?.last_name?.[0]}`
										: "U"}
								</>
							)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-96 p-2" align="end">
				<DropdownMenuLabel className="flex items-center gap-3 px-3 py-2">
					<Avatar className="size-10">
						<AvatarImage
							src={accountData?.avatar}
							alt="Profile image"
						/>
						<AvatarFallback>
							{isAccountLoading ? (
								<Skeleton className="size-4" />
							) : accountData?.first_name &&
							  accountData?.last_name ? (
								`${accountData.first_name[0]}${accountData.last_name[0]}`
							) : (
								"U"
							)}
						</AvatarFallback>
					</Avatar>
					<div className="flex min-w-0 flex-col gap-1">
						<div className="flex items-center gap-2">
							<span className="text-foreground truncate text-sm font-medium line-clamp-1">
								{isAccountLoading ? (
									<Skeleton className="size-5 w-3/4" />
								) : (
									<>
										{accountData?.first_name &&
										accountData?.last_name
											? `${accountData?.first_name} ${accountData?.last_name}`
											: "User"}
									</>
								)}
							</span>
							{authAccount?.role && (
								<Badge
									variant="secondary"
									className="shrink-0 font-normal"
								>
									{t(USER_ROLE_LABELS[authAccount.role], {
										ns: "options"
									})}
								</Badge>
							)}
						</div>
						<span className="text-muted-foreground truncate text-xs font-normal">
							{isAuthAccountLoading ? (
								<Skeleton className="size-4 w-1/2" />
							) : (
								authAccount?.email
							)}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<div className="grid grid-cols-2 gap-1">
					{OPERATOR_USER_MENU_LIST.map((menuGroup, index) => (
						<DropdownMenuGroup key={index}>
							{menuGroup.menu?.map((menuItem) => (
								<DropdownMenuItem
									key={menuItem.label}
									asChild
									className="p-0 focus:bg-muted"
								>
									<Link
										to={menuItem.path}
										className={NAV_RICH_ROW_CLASSNAME}
									>
										<NavRichItem
											icon={menuItem.icon}
											title={t(menuItem.label)}
											description={
												menuItem.description &&
												t(menuItem.description)
											}
										/>
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
					))}
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleSignOut}
					className="cursor-pointer px-3 py-2"
				>
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
