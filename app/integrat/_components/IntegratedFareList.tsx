import FareListWithFuturePrices from "@/app/components/fare/FareListWithFuturePrices";
import type { PendingChanges } from "@/app/lib/upcomingChanges";
import type { Fare } from "@/app/types/fares";

type Props = {
  trips: Fare[];
  subscriptions: Fare[];
  pendingChanges: PendingChanges;
};

export default function IntegratedFareList({
  trips,
  subscriptions,
  pendingChanges,
}: Props) {
  return (
    <FareListWithFuturePrices
      trips={trips}
      subscriptions={subscriptions}
      pendingChanges={pendingChanges}
      alertTitle="Majorare tarife integrate de la 1 mai 2026"
      alertDescription="Tarifele marcate cu portocaliu vor crește pentru titlurile comune Metrorex + STB."
    />
  );
}
