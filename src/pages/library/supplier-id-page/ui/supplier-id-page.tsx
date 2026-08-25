import { type FC } from "react";
import { useParams } from "react-router-dom";

import { SupplierDetail } from "@/widgets/library";

export const LibrarySupplierIdPage: FC = () => {
	const { supplierId = "" } = useParams<{ supplierId: string }>();

	return <SupplierDetail supplierId={supplierId} />;
};
