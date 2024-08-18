'use client'

export default function ZodiacCard({ sign, dateRange, icon, onClick }) {
    return (
        <div
            className="flex items-center justify-between p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={onClick}
        >
            <div>
                <h3 className="text-lg font-semibold">{sign}</h3>
                <p className="text-sm text-gray-600">{dateRange}</p>
            </div>
            <div>{icon}</div>
        </div>
    );
}