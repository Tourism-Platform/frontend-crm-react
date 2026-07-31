import { useLocation } from "react-router";

import { isDraftPreviewPath } from "../lib/draft-preview";

export const useIsDraftPreview = (): boolean => {
	const { pathname } = useLocation();
	return isDraftPreviewPath(pathname);
};
