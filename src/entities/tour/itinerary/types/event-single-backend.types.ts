import type {
	ActivitySingleEventReadOutput,
	GuideSingleEventReadOutput,
	HousingSingleEventReadOutput,
	InformationSingleEventReadOutput,
	SupplementarySingleEventReadOutput,
	TransferSingleEventReadOutput
} from "@/shared/api";

export type TActivitySingleEventBackend = ActivitySingleEventReadOutput;
export type THousingSingleEventBackend = HousingSingleEventReadOutput;
export type TTransferSingleEventBackend = TransferSingleEventReadOutput;
export type TInformationSingleEventBackend = InformationSingleEventReadOutput;
export type TSupplementarySingleEventBackend =
	SupplementarySingleEventReadOutput;
export type TGuideSingleEventBackend = GuideSingleEventReadOutput;
