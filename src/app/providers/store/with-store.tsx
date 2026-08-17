import { Provider } from "react-redux";

import { appStore } from "./store";

export const withStore = (Component: React.FC) => {
	return () => (
		<Provider store={appStore}>
			<Component />
		</Provider>
	);
};
