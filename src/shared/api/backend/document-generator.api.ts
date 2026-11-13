import { createApi } from "@reduxjs/toolkit/query/react";

import { documentGeneratorBaseQuery } from "./document-generator-base-query";
import { API_TAG_TYPES } from "./tags.config";

export const documentGeneratorApi = createApi({
	baseQuery: documentGeneratorBaseQuery,
	reducerPath: "documentGeneratorApi",
	endpoints: () => ({}),
	tagTypes: API_TAG_TYPES
});
