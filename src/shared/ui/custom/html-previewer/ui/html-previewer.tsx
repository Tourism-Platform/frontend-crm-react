import {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";

import { cn } from "@/shared/lib";

import { buildHtmlDocument } from "../model";

const MIN_HEIGHT = 160;

interface IHtmlPreviewerProps {
	html: string;
	title: string;
	emptyText: string;
	className?: string;
}

/** Изолированный рендер произвольного HTML: без allow-scripts скрипты не выполняются, стили не пересекаются с приложением */
export const HtmlPreviewer: FC<IHtmlPreviewerProps> = ({
	html,
	title,
	emptyText,
	className
}) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [height, setHeight] = useState(MIN_HEIGHT);
	const srcDoc = useMemo(() => buildHtmlDocument(html), [html]);

	const observerRef = useRef<ResizeObserver | null>(null);

	/** Высота iframe следует за контентом (шрифты, картинки догружаются после onLoad) */
	const handleLoad = useCallback(() => {
		observerRef.current?.disconnect();

		const root = iframeRef.current?.contentDocument?.documentElement;

		if (!root) {
			return;
		}

		const updateHeight = () =>
			setHeight(Math.max(root.scrollHeight, MIN_HEIGHT));

		updateHeight();
		observerRef.current = new ResizeObserver(updateHeight);
		observerRef.current.observe(root);
	}, []);

	useEffect(() => () => observerRef.current?.disconnect(), []);

	return (
		<div
			className={cn(
				"rounded-md border border-border overflow-auto max-h-[600px]",
				className
			)}
		>
			{html.trim() ? (
				<iframe
					ref={iframeRef}
					title={title}
					srcDoc={srcDoc}
					sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
					className="block w-full border-0"
					style={{ height }}
					onLoad={handleLoad}
				/>
			) : (
				<p className="flex min-h-40 items-center justify-center p-4 text-center text-sm text-muted-foreground">
					{emptyText}
				</p>
			)}
		</div>
	);
};
