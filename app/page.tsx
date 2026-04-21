import { getEventsForWeek, type CalendarEvent } from "@/lib/google-calendar";
import DaySection from "@/components/DaySection";

export const dynamic = "force-dynamic";

function groupByDay(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const groups = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const dateKey = event.isAllDay
      ? event.start
      : new Date(event.start).toISOString().slice(0, 10);

    const group = groups.get(dateKey) ?? [];
    group.push(event);
    groups.set(dateKey, group);
  }

  return groups;
}

function buildWeekDays(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export default async function CalendarPage() {
  let events: CalendarEvent[] = [];
  let error = false;

  try {
    events = await getEventsForWeek();
  } catch (e) {
    console.error("Failed to load events:", e);
    error = true;
  }

  const grouped = groupByDay(events);
  const weekDays = buildWeekDays();

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Giuliano&apos;s Calendar
        </h1>
        <p className="mt-1 text-sm text-gray-500">{todayStr}</p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load calendar events. Please try again later.
        </div>
      )}

      {!error && events.length === 0 && (
        <div className="rounded-xl border border-gray-100 bg-white px-4 py-8 text-center text-sm text-gray-500">
          No events this week — all clear!
        </div>
      )}

      {!error && events.length > 0 && (
        <div className="space-y-6">
          {weekDays.map((dayKey) => {
            const dayEvents = grouped.get(dayKey);
            if (!dayEvents || dayEvents.length === 0) return null;
            return (
              <DaySection key={dayKey} dateKey={dayKey} events={dayEvents} />
            );
          })}
        </div>
      )}
    </main>
  );
}
