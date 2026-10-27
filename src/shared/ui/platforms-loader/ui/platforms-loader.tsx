import { Car, Hotel, Luggage, Plane, TreePalm } from "lucide-react";
import type { CSSProperties, FC } from "react";

import { cn } from "@/shared/lib";

import styles from "./platforms-loader.module.css";

/** Иконки путешествия на орбите: угол слота и задержка «пульса» иконки */
const PLATFORMS = [
	{ key: "luggage", Icon: Luggage, angle: "0deg", delay: "0s" },
	{ key: "plane", Icon: Plane, angle: "72deg", delay: ".36s" },
	{ key: "car", Icon: Car, angle: "144deg", delay: ".72s" },
	{ key: "hotel", Icon: Hotel, angle: "216deg", delay: "1.08s" },
	{ key: "palm", Icon: TreePalm, angle: "288deg", delay: "1.44s" }
] as const;

interface IPlatformsLoaderProps {
	className?: string;
}

/** Логотип TourLink, вокруг летают чемодан, самолёт, машина, отель и пальма — pure CSS */
export const PlatformsLoader: FC<IPlatformsLoaderProps> = ({ className }) => {
	return (
		<div className={cn(styles.platforms, className)} aria-hidden="true">
			<span className={cn(styles.ring, styles.ringOuter)} />
			<span className={cn(styles.ring, styles.ringInner)} />
			<img src="/assets/logo.svg" alt="" className={styles.logo} />
			<div className={styles.carousel}>
				{PLATFORMS.map(({ key, Icon, angle, delay }) => (
					<span
						key={key}
						className={styles.slot}
						style={{ "--a": angle } as CSSProperties}
					>
						<span className={styles.badge}>
							<Icon
								className={styles.icon}
								style={{ "--d": delay } as CSSProperties}
							/>
						</span>
					</span>
				))}
			</div>
		</div>
	);
};
