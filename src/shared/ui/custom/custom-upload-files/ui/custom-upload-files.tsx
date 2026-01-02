import {
	AlertCircleIcon,
	FileIcon,
	Trash2Icon,
	UploadIcon,
	XIcon
} from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	type TFileMetadata,
	type TFileWithPreview,
	useFileUpload
} from "@/shared/hooks";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { formatBytes } from "@/shared/utils";

import { getFileIcon } from "../model";

import { DownloadButton } from "./download-button";

interface ICustomUploadFilesProps {
	size?: number;
	maxFiles?: number;
	initialFiles?: TFileMetadata[];
	onFilesChange?: (files: TFileWithPreview[]) => void;
	onFileRemove?: (fileId: string) => void;
	isLoading?: boolean;
	loadingId?: string;
}

export const CustomUploadFiles: FC<ICustomUploadFilesProps> = ({
	size = 10,
	maxFiles = 10,
	initialFiles = [],
	onFilesChange,
	onFileRemove,
	isLoading = false,
	loadingId
}) => {
	const { t } = useTranslation("common");
	const maxSize = size * 1024 * 1024;

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps
		}
	] = useFileUpload({
		multiple: true,
		maxFiles,
		maxSize,
		initialFiles,
		onFilesChange
	});

	const handleRemoveFile = (fileId: string) => {
		removeFile(fileId);
		onFileRemove?.(fileId);
	};

	return (
		<div className="flex flex-col gap-2">
			{/* Drop area */}
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={files.length > 0 || undefined}
				className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-56 flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
			>
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Upload files"
				/>

				{files.length > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium">
								{t("upload_files.uploaded")} ({files.length})
							</h3>
							<Button
								variant="outline"
								size="sm"
								type="button"
								onClick={clearFiles}
								disabled={isLoading}
							>
								<Trash2Icon
									className="-ms-0.5 size-3.5 opacity-60"
									aria-hidden="true"
								/>
								{t("upload_files.buttons.remove")}
							</Button>
						</div>
						<div className="w-full space-y-2">
							{files.map((file) => {
								const isFileLoading =
									loadingId === file.id ||
									(isLoading && file.file instanceof File);

								return (
									<div
										key={file.id}
										className={cn(
											"bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3 transition-opacity",
											isFileLoading && "opacity-60"
										)}
									>
										<div className="flex items-center gap-3 overflow-hidden">
											<div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
												{getFileIcon(file)}
											</div>
											<div className="flex min-w-0 flex-col gap-0.5">
												<p className="truncate text-[13px] font-medium">
													{file.file instanceof File
														? file.file.name
														: file.file.name}
												</p>
												<p className="text-muted-foreground text-xs">
													{formatBytes(
														file.file instanceof
															File
															? file.file.size
															: file.file.size
													)}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-1">
											{/* Download button - only for files with URL */}
											{(file.preview ||
												!(
													file.file instanceof File
												)) && (
												<DownloadButton
													file={file}
													disabled={isFileLoading}
												/>
											)}

											<Button
												size="icon"
												type="button"
												variant="ghost"
												className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
												onClick={() =>
													handleRemoveFile(file.id)
												}
												aria-label="Remove file"
												disabled={isFileLoading}
											>
												<XIcon
													className="size-4"
													aria-hidden="true"
												/>
											</Button>
										</div>
									</div>
								);
							})}

							{files.length < maxFiles && (
								<div className="flex justify-end">
									<Button
										variant="outline"
										type="button"
										onClick={openFileDialog}
										disabled={isLoading}
									>
										<UploadIcon
											className="-ms-1 opacity-60"
											aria-hidden="true"
										/>
										{t("upload_files.buttons.add")}
									</Button>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center text-center">
						<div
							className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
							aria-hidden="true"
						>
							<FileIcon className="size-4 opacity-60" />
						</div>
						<p className="mb-1.5 text-sm font-medium">
							{t("upload_files.title")}
						</p>
						<p className="text-muted-foreground text-xs">
							{t("upload_files.description", {
								maxFiles,
								maxSize: size
							})}
						</p>
						<Button
							variant="outline"
							type="button"
							className="mt-4"
							onClick={openFileDialog}
							disabled={isLoading}
						>
							<UploadIcon
								className="-ms-1 opacity-60"
								aria-hidden="true"
							/>
							{t("upload_files.buttons.select")}
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	);
};
