import type { CalendarEvent } from "@/lib/google-calendar";

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function isHappeningNow(start: string, end: string): boolean {
  const now = Date.now();
  return new Date(start).getTime() <= now && now < new Date(end).getTime();
}

export default function EventCard({ event }: { event: CalendarEvent }) {
  const happeningNow = !event.isAllDay && isHappeningNow(event.start, event.end);

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border px-4 py-3 transition
        ${
          happeningNow
            ? "border-blue-200 bg-blue-50 shadow-sm"
            : "border-gray-100 bg-white"
        }`}
    >
      <div className="mt-0.5 flex flex-col items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            happeningNow ? "bg-blue-500 animate-pulse" : "bg-gray-300"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium leading-tight ${
            happeningNow ? "text-blue-900" : "text-gray-900"
          }`}
        >
          {event.title}
        </p>
        <p
          className={`mt-0.5 text-xs ${
            happeningNow ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {event.isAllDay
            ? "All day"
            : `${formatTime(event.start)} – ${formatTime(event.end)}`}
        </p>
      </div>

      {happeningNow && (
        <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
          Now
        </span>
      )}
    </div>
  );
}
