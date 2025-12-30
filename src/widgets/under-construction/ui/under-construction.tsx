import type { FC } from "react";

import { ConstructionAnimation } from "./construction-animation";

export const UnderConstruction: FC = () => {
	return (
		<div className=" w-full flex flex-col bg-background text-foreground overflow-hidden relative">
			<main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
				<div className="max-w-2xl w-full space-y-12 text-center">
					{/* Hero Animation */}
					<div className="mb-8 animate-in fade-in zoom-in-95 duration-1000">
						<ConstructionAnimation />
					</div>

					{/* Text Content */}
					<div className="space-y-6">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
							We are building <br />
							<span className="text-muted-foreground">
								something amazing.
							</span>
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
							Our new platform is currently under development.{" "}
							<br />
							Check back soon to see what we're creating.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};
