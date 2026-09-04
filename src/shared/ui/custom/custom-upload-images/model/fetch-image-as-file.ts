const MIME_TO_EXT: Record<string, string> = {
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
	"image/gif": "gif"
};

const getImageFileName = (src: string, mime: string): string => {
	const rawName = src.split("/").pop()?.split("?")[0] ?? "image";
	if (rawName.includes(".")) return rawName;
	return `${rawName}.${MIME_TO_EXT[mime] ?? "jpg"}`;
};

export const fetchImageAsFile = async (src: string): Promise<File> => {
	const res = await fetch(src, { cache: "no-store" });
	if (!res.ok) throw new Error("Failed to read image");
	const blob = await res.blob();
	if (!blob.size) throw new Error("Failed to read image");
	const type = blob.type.startsWith("image/") ? blob.type : "image/jpeg";
	return new File([blob], getImageFileName(src, type), { type });
};
