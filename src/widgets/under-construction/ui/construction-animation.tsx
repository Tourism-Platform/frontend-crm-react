import { useEffect, useRef } from "react";

export function ConstructionAnimation() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const updateSize = () => {
			const rect = canvas.parentElement?.getBoundingClientRect();
			if (rect) {
				canvas.width = rect.width * window.devicePixelRatio;
				canvas.height = rect.height * window.devicePixelRatio;
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}
		};
		updateSize();
		window.addEventListener("resize", updateSize);

		const nodes: Array<{
			x: number;
			y: number;
			vx: number;
			vy: number;
			life: number;
			hue: number;
		}> = [];

		let time = 0;

		const drawFrame = () => {
			time++;

			const w = canvas.width / window.devicePixelRatio;
			const h = canvas.height / window.devicePixelRatio;

			// Clear frame instead of fading to white to avoid "card" effect
			ctx.clearRect(0, 0, w, h);

			// Create new nodes periodically
			if (time % 8 === 0) {
				for (let i = 0; i < 2; i++) {
					const angle = Math.random() * Math.PI * 2;
					const distance = 40 + Math.random() * 30;
					nodes.push({
						x: w / 2 + Math.cos(angle) * distance,
						y: h / 2 + Math.sin(angle) * distance,
						vx: (Math.random() - 0.5) * 2,
						vy: (Math.random() - 0.5) * 2,
						life: 100 + Math.random() * 100,
						hue: (time * 0.5 + Math.random() * 60) % 360
					});
				}
			}

			// Update and draw nodes
			for (let i = nodes.length - 1; i >= 0; i--) {
				const node = nodes[i];
				node.life--;
				node.x += node.vx;
				node.y += node.vy;
				node.vx *= 0.98;
				node.vy *= 0.98;

				// Gravity towards center
				const dx = w / 2 - node.x;
				const dy = h / 2 - node.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist > 0) {
					node.vx += (dx / dist) * 0.03;
					node.vy += (dy / dist) * 0.03;
				}

				const alpha = Math.max(0, node.life / 150);
				const size = 2 + Math.sin(time * 0.05 + i) * 1;

				// Draw glow
				const gradient = ctx.createRadialGradient(
					node.x,
					node.y,
					0,
					node.x,
					node.y,
					size * 3
				);
				gradient.addColorStop(
					0,
					`hsla(${node.hue}, 100%, 60%, ${alpha * 0.4})`
				);
				gradient.addColorStop(
					1,
					`hsla(${node.hue}, 100%, 60%, ${alpha * 0.05})`
				);

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
				ctx.fill();

				// Draw node
				ctx.fillStyle = `hsla(${node.hue}, 100%, 60%, ${alpha})`;
				ctx.beginPath();
				ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
				ctx.fill();

				if (node.life <= 0) {
					nodes.splice(i, 1);
				}
			}

			// Draw connections
			ctx.strokeStyle = "rgba(100, 150, 255, 0.15)";
			ctx.lineWidth = 1;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[j].x - nodes[i].x;
					const dy = nodes[j].y - nodes[i].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < 100) {
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.stroke();
					}
				}
			}

			// Draw central pulse
			const pulse = Math.sin(time * 0.02) * 20 + 30;
			const centralGradient = ctx.createRadialGradient(
				w / 2,
				h / 2,
				0,
				w / 2,
				h / 2,
				pulse
			);
			centralGradient.addColorStop(
				0,
				`hsla(${(time * 0.5) % 360}, 100%, 60%, 0.3)`
			);
			centralGradient.addColorStop(
				1,
				`hsla(${(time * 0.5) % 360}, 100%, 60%, 0)`
			);

			ctx.fillStyle = centralGradient;
			ctx.beginPath();
			ctx.arc(w / 2, h / 2, pulse, 0, Math.PI * 2);
			ctx.fill();

			ctx.strokeStyle = `hsla(${(time * 0.5) % 360}, 100%, 60%, 0.5)`;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(w / 2, h / 2, pulse, 0, Math.PI * 2);
			ctx.stroke();

			requestAnimationFrame(drawFrame);
		};

		drawFrame();

		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	return (
		<div className="relative w-80 h-80 mx-auto">
			<canvas
				ref={canvasRef}
				className="w-full h-full animate-in fade-in duration-1000"
			/>

			{/* Subtle overlay text */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
				<div className="text-center">
					<div className="text-xs font-mono tracking-widest text-foreground/30 uppercase">
						Generating
					</div>
				</div>
			</div>
		</div>
	);
}
