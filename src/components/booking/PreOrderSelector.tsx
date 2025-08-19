import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatIndianCurrency } from "@/lib/currency";

export interface PreOrderItem {
	id: number;
	title: string;
	price: number;
}

export const SUGGESTED_ITEMS: PreOrderItem[] = [
	{ id: 1, title: "Paneer Tikka", price: 320 },
	{ id: 2, title: "Chicken Lollipop", price: 360 },
	{ id: 3, title: "Veg Manchurian", price: 280 },
	{ id: 4, title: "Sweet Lassi", price: 120 },
];

interface PreOrderSelectorProps {
	value: Record<number, number>;
	onChange: (next: Record<number, number>) => void;
}

export function PreOrderSelector({ value, onChange }: PreOrderSelectorProps) {
	const [quantities, setQuantities] = useState<Record<number, number>>(value || {});

	const setQty = (id: number, qty: number) => {
		const next = { ...quantities, [id]: Math.max(0, qty) };
		setQuantities(next);
		onChange(next);
	};

	const total = Object.entries(quantities).reduce((sum, [id, qty]) => {
		const item = SUGGESTED_ITEMS.find((i) => i.id === Number(id));
		return sum + (item ? item.price * (qty as number) : 0);
	}, 0);

	return (
		<div className="space-y-3">
			<div className="font-medium">Pre-order Starters</div>
			<div className="grid grid-cols-1 gap-3">
				{SUGGESTED_ITEMS.map((item) => (
					<div key={item.id} className="flex items-center justify-between p-3 rounded-md border">
						<div>
							<div className="font-medium">{item.title}</div>
							<div className="text-xs text-muted-foreground">{formatIndianCurrency(item.price)}</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" onClick={() => setQty(item.id, (quantities[item.id] || 0) - 1)} disabled={(quantities[item.id] || 0) <= 0}>
								<Minus className="h-3 w-3" />
							</Button>
							<span className="w-8 text-center">{quantities[item.id] || 0}</span>
							<Button variant="outline" size="sm" onClick={() => setQty(item.id, (quantities[item.id] || 0) + 1)}>
								<Plus className="h-3 w-3" />
							</Button>
						</div>
					</div>
				))}
			</div>
			<div className="flex items-center justify-between text-sm">
				<span>Total pre-order:</span>
				<span className="font-semibold text-primary">{formatIndianCurrency(total)}</span>
			</div>
		</div>
	);
}
