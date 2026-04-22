import type {
	AuthUserProfileModel,
	BodyUploadAvatarProfileMePhotoPost,
	UserProfileUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const PROFILE_INFO_PATHS = {
	getMyAccount: {
		url: "/profile/me",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: AuthUserProfileModel;
		}
	} as const,
	updateMyProfile: {
		url: "/profile/me",
		method: "PATCH",
		_types: {} as {
			body: UserProfileUpdate;
			query: void;
			response: AuthUserProfileModel;
		}
	} as const,
	uploadAvatar: {
		url: "/profile/me/photo",
		method: "POST",
		_types: {} as {
			body: BodyUploadAvatarProfileMePhotoPost;
			query: void;
			response: AuthUserProfileModel;
		}
	} as const,
	deleteAvatar: {
		url: "/profile/me/photo",
		method: "DELETE",
		_types: {} as { body: void; query: void; response: void }
	} as const
} as const;
