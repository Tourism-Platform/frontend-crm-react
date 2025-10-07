import { RouterProvider } from "react-router-dom";

import { withProviders } from "./providers";
import { router } from "./router";

const App: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default withProviders(App);
