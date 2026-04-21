import type { CalendarEvent } from "@/lib/google-calendar";
import EventCard from "./EventCard";

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isTomorrow(dateStr: string): boolean {
  const d = new Date(dateStr);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate()
  );
}

function formatDayHeading(dateStr: string): string {
  if (isToday(dateStr)) return "Today";
  if (isTomorrow(dateStr)) return "Tomorrow";

  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

interface DaySectionProps {
  dateKey: string;
  events: CalendarEvent[];
}

export default function DaySection({ dateKey, events }: DaySectionProps) {
  const today = isToday(dateKey);

  return (
    <section>
      <h2
        className={`mb-3 text-sm font-semibold uppercase tracking-wide ${
          today ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {formatDayHeading(dateKey)}
      </h2>
      <div className="space-y-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
