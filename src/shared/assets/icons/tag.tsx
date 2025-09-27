export const TagIcon = (props: React.SVGProps<SVGSVGElement>) => {
	const color = props?.color || "#000";
	const size = props?.height || 14;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 12 12"
			fill="none"
			{...props}
		>
			<path
				fill={color}
				stroke={color}
				strokeWidth={1.5}
				d="M5.861 1.37h.215c.492.028.963.238 1.318.593l2.645 2.644c.796.793.794 2.076 0 2.86l-2.563 2.564c-.799.793-2.086.79-2.877 0L1.957 7.388a2.043 2.043 0 0 1-.592-1.533l.14-2.915a1.505 1.505 0 0 1 1.437-1.43h.002l2.917-.14Zm-1.32.742a2.43 2.43 0 1 0 .001 4.86 2.43 2.43 0 0 0 0-4.86Z"
			/>
		</svg>
	);
};
