import { type ComponentProps, type FC, type ReactNode } from "react";

import { DotsRing } from "@/shared/ui/shadcn-ui";
import { TextDots } from "@/shared/ui/shadcn-ui";
import { Button } from "@/shared/ui/shadcn-ui/button";

type TLoaderButtonProps = Omit<ComponentProps<typeof Button>, "type"> & {
	isLoading?: boolean;
	/** Без подписи — кнопка-иконка: обязателен `aria-label` */
	label?: string;
	/** Подпись во время загрузки; по умолчанию — `label` */
	loadingLabel?: string;
	/** Иконка слева от текста, на время загрузки заменяется лоадером */
	icon?: ReactNode;
	type?: ComponentProps<typeof Button>["type"];
};

export const LoaderButton: FC<TLoaderButtonProps> = ({
	isLoading = false,
	label,
	loadingLabel,
	icon,
	disabled,
	type = "submit",
	...props
}) => {
	const text = isLoading ? (loadingLabel ?? label) : label;

	return (
		<Button type={type} disabled={disabled ?? isLoading} {...props}>
			{isLoading ? <DotsRing className="!h-[20px] !w-[20px]" /> : icon}
			{text ? (
				isLoading ? (
					<TextDots>{text}</TextDots>
				) : (
					<span>{text}</span>
				)
			) : null}
		</Button>
	);
};
