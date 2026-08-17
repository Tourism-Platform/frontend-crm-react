import { createApi } from "@reduxjs/toolkit/query/react";

import { documentGeneratorBaseQuery } from "./document-generator-base-query";
import { ENUM_API_TAGS } from "./tags.config";

export const documentGeneratorApi = createApi({
	baseQuery: documentGeneratorBaseQuery,
	reducerPath: "documentGeneratorApi",
	endpoints: () => ({}),
	tagTypes: [ENUM_API_TAGS.FINANCE_INVOICES]
});
