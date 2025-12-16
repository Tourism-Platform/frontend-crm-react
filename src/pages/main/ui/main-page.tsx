import {
	Banknote,
	Building2,
	CalendarCheck,
	Globe,
	Layers,
	MapPin,
	ShieldCheck,
	Star
} from "lucide-react";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export const MainPage: FC = () => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.userSlice);

	const handleCtaClick = () => {
		if (isAuth) {
			navigate(ENUM_PATH.TOURS.ROOT);
		} else {
			navigate(ENUM_PATH.LOGIN);
		}
	};

	return (
		<div className="flex flex-col gap-16">
			{/* HERO SECTION */}
			<section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden px-6 text-center">
				<div className="relative z-10 max-w-4xl mx-auto space-y-6">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900 dark:text-white">
						The Ultimate B2B Tour Platform for
						<span className="text-primary block mt-2">
							Travel Agents in Uzbekistan
						</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
						Create, publish, and purchase tours seamlessly. Connect
						with top local providers and expand your business with
						our all-in-one marketplace.
					</p>
					<div className="flex justify-center gap-4 pt-4">
						<Button
							size="lg"
							className="px-8 text-lg h-12"
							onClick={handleCtaClick}
						>
							{isAuth ? "Go to Tours" : "Get Started for Free"}
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="px-8 text-lg h-12"
							onClick={() =>
								window.scrollTo({
									top: document.body.scrollHeight,
									behavior: "smooth"
								})
							}
						>
							Learn More
						</Button>
					</div>
				</div>
				{/* Decorative background elements can go here */}
				<div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
					<Globe className="absolute top-10 left-10 w-64 h-64 text-primary" />
					<MapPin className="absolute bottom-10 right-10 w-48 h-48 text-primary" />
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section className="px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight mb-4">
						How It Works
					</h2>
					<p className="text-muted-foreground text-lg">
						Start your journey in 3 simple steps
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{[
						{
							icon: Layers,
							title: "1. Create Tours",
							desc: "Use our intuitive builder to design unique tour packages with detailed itineraries, pricing, and media."
						},
						{
							icon: Globe,
							title: "2. Publish",
							desc: "Showcase your tours to thousands of agents and travelers. Manage availability and pricing in real-time."
						},
						{
							icon: Banknote,
							title: "3. Sell & Buy",
							desc: "Receive bookings directly or purchase verified tours from other partners for clients."
						}
					].map((item, index) => (
						<Card
							key={index}
							className="border-none shadow-md hover:shadow-lg transition-shadow bg-card"
						>
							<CardHeader className="flex flex-col items-center text-center">
								<div className="p-4 rounded-full bg-primary/10 mb-4 text-primary">
									<item.icon className="w-8 h-8" />
								</div>
								<CardTitle className="text-xl">
									{item.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center text-muted-foreground">
								{item.desc}
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* FEATURES */}
			<section className="px-4 bg-slate-50 dark:bg-slate-900/50 py-16 rounded-3xl">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight">
								Why Choose Our Platform?
							</h2>
							<p className="text-muted-foreground text-lg">
								We provide tools specifically designed for the
								unique needs of the Uzbek tourism market,
								helping you automate workflows and increase
								sales.
							</p>
							<div className="grid gap-4">
								{[
									{
										icon: CalendarCheck,
										title: "Save Time",
										desc: "Automated booking confirmations and itinerary generation."
									},
									{
										icon: Building2,
										title: "Centralized Hub",
										desc: "Manage all your partners, clients, and payments in one place."
									},
									{
										icon: ShieldCheck,
										title: "Verified Partners",
										desc: "Work only with trusted tour operators and verified agents."
									}
								].map((feature, i) => (
									<div
										key={i}
										className="flex gap-4 items-start"
									>
										<div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
											<feature.icon className="w-5 h-5" />
										</div>
										<div>
											<h3 className="font-semibold">
												{feature.title}
											</h3>
											<p className="text-muted-foreground text-sm">
												{feature.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="hidden lg:flex justify-center">
							{/* Placeholder for feature image */}
							<div className="w-full h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/20">
								<div className="text-primary/50 font-medium flex flex-col items-center gap-2">
									<Layers className="w-16 h-16" />
									<p>Platform Dashboard UI Preview</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ABOUT COMPANY */}
			<section className="px-4 text-center max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold tracking-tight mb-6">
					About Our Company
				</h2>
				<p className="text-muted-foreground text-lg leading-relaxed mb-8">
					We are dedicated to digitizing the tourism industry in
					Uzbekistan. Our mission is to bridge the gap between local
					tour operators and global travel standards, providing a
					robust infrastructure for growth. Built by tourism experts
					for tourism professionals.
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{[
						{ label: "Active Agents", value: "500+" },
						{ label: "Tours Created", value: "1.2k+" },
						{ label: "Bookings", value: "15k" },
						{ label: "Cities", value: "12" }
					].map((stat, i) => (
						<div key={i} className="flex flex-col items-center">
							<span className="text-3xl font-bold text-primary">
								{stat.value}
							</span>
							<span className="text-sm text-muted-foreground">
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* REVIEWS */}
			<section className="px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight mb-4">
						Trusted by Agents
					</h2>
					<p className="text-muted-foreground">
						See what your colleagues are saying
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{[
						{
							name: "Aziz Rakhimov",
							role: "Tour Agent, Tashkent",
							text: "This platform changed how we work. Finding reliable partners for group tours used to be a headache, now it takes minutes."
						},
						{
							name: "Elena Kim",
							role: "Travel Manager, Samarkand",
							text: "Great interface and very useful tools for creating itineraries. My clients love the detailed PDF exports."
						},
						{
							name: "Jamshid Aliev",
							role: "Agency Owner, Bukhara",
							text: "Finally, a centralized system for Uzbekistan's market. Integration was smooth and support is always helpful."
						}
					].map((review, i) => (
						<Card
							key={i}
							className="bg-slate-50 dark:bg-slate-900 border-none"
						>
							<CardHeader>
								<div className="flex gap-1 mb-2">
									{[...Array(5)].map((_, stars) => (
										<Star
											key={stars}
											className="w-4 h-4 fill-yellow-400 text-yellow-400"
										/>
									))}
								</div>
								<p className="text-sm italic text-muted-foreground">
									"{review.text}"
								</p>
							</CardHeader>
							<CardContent className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
									{review.name[0]}
								</div>
								<div>
									<h4 className="font-semibold text-sm">
										{review.name}
									</h4>
									<p className="text-xs text-muted-foreground">
										{review.role}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* BOTTOM CTA */}
			<section className="px-4 py-20 text-center bg-primary/5 rounded-3xl mx-4">
				<div className="max-w-2xl mx-auto space-y-6">
					<h2 className="text-3xl font-bold tracking-tight">
						Ready to Grow Your Business?
					</h2>
					<p className="text-lg text-muted-foreground">
						Join hundreds of travel agents in Uzbekistan who are
						already scaling their sales.
					</p>
					<Button
						size="lg"
						className="px-10 text-lg h-14"
						onClick={handleCtaClick}
					>
						{isAuth ? "Explore Tours" : "Join the Platform Now"}
					</Button>
					<p className="text-sm text-muted-foreground">
						No credit card required for registration.
					</p>
				</div>
			</section>
		</div>
	);
};
