import {
	type ComponentProps,
	type FC,
	type RefObject,
	useEffect,
	useState
} from "react";

import { AnimatedBeam } from "@/shared/ui";

type TFromSide = "left" | "right";

interface INetworkBeamProps
	extends Omit<
		ComponentProps<typeof AnimatedBeam>,
		"startXOffset" | "startYOffset"
	> {
	fromRef: RefObject<HTMLElement | null>;
	fromSide: TFromSide;
}

/** Смещение старта к краю карточки; конец — центр hub + endYOffset (как в AnimatedBeam) */
export const NetworkBeam: FC<INetworkBeamProps> = ({
	fromRef,
	fromSide,
	...beamProps
}) => {
	const [startXOffset, setStartXOffset] = useState(0);

	useEffect(() => {
		const update = () => {
			const el = fromRef.current;

			if (!el) return;

			const half = el.getBoundingClientRect().width / 2;

			setStartXOffset(fromSide === "right" ? half : -half);
		};

		update();

		const observer = new ResizeObserver(update);

		if (fromRef.current) observer.observe(fromRef.current);

		return () => observer.disconnect();
	}, [fromRef, fromSide]);

	return (
		<AnimatedBeam
			{...beamProps}
			fromRef={fromRef}
			startXOffset={startXOffset}
		/>
	);
};
