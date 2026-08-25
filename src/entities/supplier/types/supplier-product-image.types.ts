export interface ISupplierProductImage {
	id: string;
	productId: string;
	imagePath: string;
	isPrimary: boolean;
}

export interface ISupplierNodeImage {
	id: string;
	imagePath: string;
	isPrimary: boolean;
}

export interface IListProductImages {
	supplierId: string;
	productId: string;
}

export interface IUploadProductImages {
	supplierId: string;
	productId: string;
	files: File[];
}

export interface ISetPrimaryProductImage {
	supplierId: string;
	productId: string;
	imageId: string;
}

export interface IDeleteProductImage {
	supplierId: string;
	productId: string;
	imageId: string;
}

export interface IUploadNodeImages {
	supplierId: string;
	productId: string;
	variantId: string;
	nodeId: string;
	files: File[];
}

export interface ISetPrimaryNodeImage {
	supplierId: string;
	productId: string;
	variantId: string;
	nodeId: string;
	imageId: string;
}

export interface IDeleteNodeImage {
	supplierId: string;
	productId: string;
	variantId: string;
	nodeId: string;
	imageId: string;
}
