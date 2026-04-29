import FareListWithFuturePrices from "@/app/components/fare/FareListWithFuturePrices";
import { NEXT_PRICE_CHANGE_DATE, formatDateRoLong } from "@/app/lib/dates";
import type { PendingChanges } from "@/app/lib/upcomingChanges";
import type { Fare } from "@/app/types/fares";

type Props = {
  trips: Fare[];
  subscriptions: Fare[];
  pendingChanges: PendingChanges;
};

export default function MetrorexFareList({
  trips,
  subscriptions,
  pendingChanges,
}: Props) {
  return (
    <FareListWithFuturePrices
      trips={trips}
      subscriptions={subscriptions}
      pendingChanges={pendingChanges}
      alertTitle={`Majorare tarife Metrorex de la ${formatDateRoLong(NEXT_PRICE_CHANGE_DATE)}`}
      alertDescription="Tarifele marcate cu portocaliu vor crește. Elevii și studenții beneficiază în continuare de gratuitate și reducere 90%."
    />
  );
}
