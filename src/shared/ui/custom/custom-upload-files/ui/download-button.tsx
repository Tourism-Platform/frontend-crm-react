import { DownloadMinimalisticIcon } from "@solar-icons/react/outline";
import type { FC } from "react";

import {
	type TFileMetadata,
	type TFileWithPreview,
	useDownloadFile
} from "@/shared/hooks";
import { LoaderButton } from "@/shared/ui/custom/loader-button";

interface IDownloadButtonProps {
	file: TFileWithPreview;
	disabled?: boolean;
}

export const DownloadButton: FC<IDownloadButtonProps> = ({
	file,
	disabled = false
}) => {
	const [{ isDownloading }, { download }] = useDownloadFile();

	const handleDownload = () => {
		const url = file.preview || (file.file as TFileMetadata).url;
		if (!url) return;

		download({ url, fileName: file.file.name });
	};

	const isDisabled = disabled || isDownloading;

	return (
		<LoaderButton
			size="icon"
			type="button"
			variant="ghost"
			className="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
			onClick={handleDownload}
			aria-label="Download file"
			disabled={isDisabled}
			isLoading={isDownloading}
			icon={<DownloadMinimalisticIcon />}
		/>
	);
};
