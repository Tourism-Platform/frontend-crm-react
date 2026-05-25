import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";

import { Main } from "@/widgets/main";

export const MainPage: FC = () => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.userSlice);

	const handleNavigateCta = () => {
		if (isAuth) {
			navigate(ENUM_PATH.TOURS.ROOT);
		} else {
			navigate(ENUM_PATH.LOGIN);
		}
	};

	return <Main onNavigateCta={handleNavigateCta} />;
};
