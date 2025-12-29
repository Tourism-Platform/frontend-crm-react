export interface IBusinessInfoBackend {
	avatarUrl: string;
	business: {
		businessDescription: string;
		businessName: string;
		businessWebsite?: string;
	};
	legal: {
		legalCompanyName: string;
		director: string;
		tin: string;
		typeOfBusiness: string;
	};
	address: {
		addressLine: string;
		country: string;
		city: string;
	};
	contact: {
		contactPerson: string;
		position: string;
		phoneNumber: string;
		email: string;
	};
}
