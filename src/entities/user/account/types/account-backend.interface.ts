import type {
	AuthUserProfileModel,
	PROFILE_INFO_PATHS,
	UserProfileUpdate
} from "@/shared/api";

export type TAccountBackend = AuthUserProfileModel;

export type TMyAccountBackend =
	typeof PROFILE_INFO_PATHS.getMyAccount._types.response;

export type TUpdateAccountBackend = UserProfileUpdate;
