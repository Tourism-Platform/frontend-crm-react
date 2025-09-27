import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import {
	CustomBreadcrumb,
	CustomSidebar,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import { HeaderOwner } from "@/widgets/layouts";

import { withProviders } from "./providers";

function App() {
	const { t } = useTranslation("home");
	return (
		<BrowserRouter>
			<div className=" bg-background text-foreground">
				<HeaderOwner />
				<div>
					<SidebarProvider>
						<CustomSidebar />
						<SidebarInset>
							<div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10">
								<CustomBreadcrumb />
							</div>
							<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
								<div className="flex gap-5 items-center">
									<div>
										<h1 className="text-9xl bg-accent">
											{t("text")}
										</h1>
										<p className="text-xs">
											{t("welcome")}
										</p>
									</div>
								</div>
								<div className="grid auto-rows-min gap-4 md:grid-cols-3">
									<div className="bg-muted/50 aspect-video rounded-xl" />
									<div className="bg-muted/50 aspect-video rounded-xl" />
									<div className="bg-muted/50 aspect-video rounded-xl" />
								</div>
								<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
							</div>
						</SidebarInset>
					</SidebarProvider>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default withProviders(App);
