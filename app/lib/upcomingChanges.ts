import upcomingChanges from "../data/upcoming-changes.json";
import type { Operator } from "../types/fares";

export type PendingChange = { newPrice: number };
export type PendingChanges = Record<string, PendingChange>;

export function getPendingChangesByOperator(operator: Operator): PendingChanges {
  const announcement = upcomingChanges.announcements.find(
    (item) => item.operator === operator,
  );

  return Object.fromEntries(
    (announcement?.changes ?? []).map((change) => [
      change.fareId,
      { newPrice: change.newPrice },
    ]),
  );
}

export function getPendingPrice(fareId: string): number | undefined {
  return upcomingChanges.announcements
    .flatMap((announcement) => announcement.changes)
    .find((change) => change.fareId === fareId)?.newPrice;
}
