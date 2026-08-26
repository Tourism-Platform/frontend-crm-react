import { type ComponentProps, type FC } from "react";

import { DotsRing } from "@/shared/ui/shadcn-ui";
import { TextDots } from "@/shared/ui/shadcn-ui";
import { Button } from "@/shared/ui/shadcn-ui/button";

type TLoaderButtonProps = Omit<ComponentProps<typeof Button>, "type"> & {
	isLoading?: boolean;
	label: string;
	loadingLabel: string;
	type?: ComponentProps<typeof Button>["type"];
};

export const LoaderButton: FC<TLoaderButtonProps> = ({
	isLoading = false,
	label,
	loadingLabel,
	disabled,
	type = "submit",
	...props
}) => (
	<Button type={type} disabled={disabled ?? isLoading} {...props}>
		{isLoading && <DotsRing className="!h-[20px] !w-[20px]" />}
		{isLoading ? <TextDots>{loadingLabel}</TextDots> : <span>{label}</span>}
	</Button>
);
