import { useMemo } from "react";
import { cn } from "@/lib/utils";

export type SeatingPreference = "indoor" | "outdoor" | "window";

export interface TableInfo {
	id: number;
	name: string;
	capacity: number;
	seating: SeatingPreference;
}

interface TableLayoutProps {
	date: string;
	time: string;
	guests: number;
	seatingPreference: SeatingPreference;
	selectedTableId: number | null;
	onSelect: (tableId: number) => void;
}

const ALL_TABLES: TableInfo[] = [
	{ id: 1, name: "T1", capacity: 2, seating: "window" },
	{ id: 2, name: "T2", capacity: 2, seating: "window" },
	{ id: 3, name: "T3", capacity: 4, seating: "indoor" },
	{ id: 4, name: "T4", capacity: 4, seating: "indoor" },
	{ id: 5, name: "T5", capacity: 4, seating: "indoor" },
	{ id: 6, name: "T6", capacity: 6, seating: "indoor" },
	{ id: 7, name: "T7", capacity: 2, seating: "outdoor" },
	{ id: 8, name: "T8", capacity: 4, seating: "outdoor" },
	{ id: 9, name: "T9", capacity: 6, seating: "outdoor" },
	{ id: 10, name: "T10", capacity: 2, seating: "indoor" },
	{ id: 11, name: "T11", capacity: 2, seating: "window" },
	{ id: 12, name: "T12", capacity: 4, seating: "window" },
	{ id: 13, name: "T13", capacity: 6, seating: "indoor" },
	{ id: 14, name: "T14", capacity: 2, seating: "indoor" },
	{ id: 15, name: "T15", capacity: 4, seating: "outdoor" },
	{ id: 16, name: "T16", capacity: 6, seating: "indoor" },
];

function getMockAvailabilityKey(date: string, time: string) {
	return `${date}|${time}`;
}

function computeAvailability(date: string, time: string) {
	// Mock availability: deterministically mark some tables as occupied based on date+time hash
	const key = getMockAvailabilityKey(date, time);
	let seed = 0;
	for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) % 100000;
	return new Set(
		ALL_TABLES
			.filter((t, idx) => ((seed + idx * 17) % 7) === 0) // roughly 1/7 occupied
			.map((t) => t.id)
	);
}

export function TableLayout({ date, time, guests, seatingPreference, selectedTableId, onSelect }: TableLayoutProps) {
	const occupied = useMemo(() => computeAvailability(date, time), [date, time]);

	const filtered = useMemo(() => {
		return ALL_TABLES.filter((t) =>
			(t.capacity >= guests && (seatingPreference ? t.seating === seatingPreference : true))
		);
	}, [guests, seatingPreference]);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					Select a table matching your preference. Grey = occupied.
				</div>
				<div className="flex items-center gap-2 text-xs">
					<div className="w-3 h-3 rounded bg-green-500" /> Available
					<div className="w-3 h-3 rounded bg-gray-300" /> Occupied
					<div className="w-3 h-3 rounded bg-orange-500" /> Selected
				</div>
			</div>
			<div className="grid grid-cols-4 gap-3">
				{ALL_TABLES.map((table) => {
					const isOccupied = occupied.has(table.id);
					const isSuggested = filtered.some((f) => f.id === table.id);
					const isSelected = selectedTableId === table.id;
					return (
						<button
							key={table.id}
							disabled={isOccupied}
							onClick={() => onSelect(table.id)}
							className={cn(
								"p-3 rounded-lg border text-left transition",
								isOccupied && "bg-gray-200 text-gray-400 cursor-not-allowed",
								!isOccupied && isSuggested && "border-primary/60",
								isSelected && "bg-orange-500 text-white border-orange-600"
							)}
						>
							<div className="flex items-center justify-between">
								<span className="font-semibold">{table.name}</span>
								<span className="text-xs capitalize">{table.seating}</span>
							</div>
							<div className="text-xs">Capacity: {table.capacity}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
