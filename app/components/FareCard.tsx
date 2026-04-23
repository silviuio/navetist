import { pricePerTrip } from "../lib/fares";
import type { Fare, Operator } from "../types/fares";

const operatorBg: Record<Operator, string> = {
  stb: "bg-emerald-900",
  metrorex: "bg-gray-800",
  integrated: "bg-slate-700",
};

type Props = {
  fare: Fare;
};

const FareCard = ({ fare }: Props) => {
  return (
    <div className={`${operatorBg[fare.operator]} text-white p-4 rounded-lg`}>
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold">{fare.name}</h3>
        <span className="text-lg font-bold">{fare.price} RON</span>
      </div>

      <div className="mt-2 text-sm text-gray-300 space-y-1">
        {fare.category === "trip" && (
          <>
            <p>Preț per călătorie: {pricePerTrip(fare).toFixed(2)} RON</p>
            {fare.validityMinutes && <p>Valabilitate: {fare.validityMinutes} minute</p>}
            {fare.transferable && <p>Transfer între linii inclus</p>}
          </>
        )}

        {fare.category === "time-pass" && (
          <>
            <p>Valabilitate: {fare.duration.value} {fare.duration.unit}</p>
            <p>Necesită validare la prima utilizare</p>
            {fare.activationWindowMinutes && (
              <p>Fereastră activare: {fare.activationWindowMinutes} minute</p>
            )}
          </>
        )}

        {fare.category === "subscription" && (
          <>
            <p>Valabilitate: {fare.duration.value} {fare.duration.unit}</p>
            {fare.nominalRequired && <p>Necesită card nominal</p>}
          </>
        )}

        <p className="text-gray-400 text-xs uppercase tracking-wide mt-2">
          {fare.operator} · {fare.scope}
        </p>
      </div>
    </div>
  );
};

export default FareCard;
