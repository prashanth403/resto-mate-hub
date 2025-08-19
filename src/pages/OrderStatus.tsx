import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChefHat, Flame, Utensils, Bell, Truck, Package, Sparkles, Timer } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const STAGES = [
	{ key: "confirmed", label: "Order Confirmed", icon: CheckCircle },
	{ key: "preparing", label: "Preparing", icon: ChefHat },
	{ key: "cooking", label: "Cooking", icon: Flame },
	{ key: "ready", label: "Ready", icon: Utensils },
	{ key: "handoff", label: "Serving / Out for Delivery / Ready for Pickup", icon: Bell },
	{ key: "completed", label: "Completed", icon: Sparkles },
] as const;

type StageKey = typeof STAGES[number]["key"];

export default function OrderStatus() {
	const navigate = useNavigate();
	const location = useLocation();
	const { orderId, deliveryType } = (location.state as any) || { orderId: `RM${Date.now()}`, deliveryType: "dine-in" };

	const [stageIndex, setStageIndex] = useState(0);
	const [etaSeconds, setEtaSeconds] = useState(25 * 60);

	useEffect(() => {
		const interval = setInterval(() => setEtaSeconds((s) => Math.max(0, s - 1)), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => setStageIndex((i) => Math.min(STAGES.length - 1, i + 1)), 60 * 1000);
		return () => clearInterval(timer);
	}, []);

	const formattedEta = useMemo(() => {
		const m = Math.floor(etaSeconds / 60);
		const s = etaSeconds % 60;
		return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	}, [etaSeconds]);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="py-12">
				<div className="container mx-auto px-4 max-w-3xl">
					<Card>
						<CardHeader>
							<CardTitle>Order Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="text-sm text-muted-foreground">Order ID</div>
									<div className="font-semibold">{orderId}</div>
								</div>
								<div className="flex items-center gap-2">
									<Timer className="h-4 w-4 text-primary" />
									<span className="text-sm">ETA</span>
									<span className="font-semibold text-primary">{formattedEta}</span>
								</div>
							</div>

							{/* Timeline */}
							<div className="relative pl-6">
								<div className="absolute left-3 top-0 bottom-0 w-0.5 bg-orange-200" />
								<div className="space-y-6">
									{STAGES.map((s, idx) => {
										const ActiveIcon = s.icon;
										const isActive = idx <= stageIndex;
										return (
											<div key={s.key} className="relative flex items-start gap-4">
												<div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-white animate-pulse' : 'bg-muted text-muted-foreground'}`}>
													<ActiveIcon className="h-3 w-3" />
												</div>
												<div>
													<div className="font-medium">{s.label}</div>
													<div className="text-xs text-muted-foreground">{idx === stageIndex ? 'In progress' : idx < stageIndex ? 'Completed' : 'Pending'}</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							{/* Delivery block */}
							<div className="p-4 rounded-lg border bg-muted/40">
								<div className="font-semibold mb-1">Delivery Type</div>
								<div className="text-sm capitalize">{deliveryType}</div>
								<div className="text-xs text-muted-foreground mt-1">Updates are sent in real-time.</div>
							</div>

							<div className="flex justify-end">
								<Button variant="outline" onClick={() => navigate('/menu')}>Back to Menu</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}
