// import { ThemeToggle } from "@/shared/ui";
import {
	Separator,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/shared/ui";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/shared/ui";
import { AppSidebar } from "@/shared/ui/app-sidebar";

import { HeaderOwner } from "@/widgets/layouts";

import { withProviders } from "./providers";

function App() {
	return (
		<>
			<div className=" bg-background text-foreground">
				<HeaderOwner />
				<div>
					<SidebarProvider>
						<AppSidebar />
						<SidebarInset>
							<div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10">
								<div className="flex items-center gap-2 px-4">
									<SidebarTrigger className="-ml-1" />
									<Separator
										orientation="vertical"
										className="mr-2 data-[orientation=vertical]:h-4"
									/>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem className="hidden md:block">
												<BreadcrumbLink href="#">
													Building Your Application
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator className="hidden md:block" />
											<BreadcrumbItem>
												<BreadcrumbPage>
													Data Fetching
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
								<div className="flex gap-5 items-center">
									<div>
										<h1 className="text-9xl bg-accent">
											ТЕСТ ДЕПЛОЙ на ДЕВ
										</h1>
										<p className="text-xs">Мелкий текст</p>
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
		</>
	);
}

export default withProviders(App);
