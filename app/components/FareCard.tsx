import { pricePerTrip } from "../lib/fares";
import type { Fare, Operator } from "../types/fares";

const operatorBg: Record<Operator, string> = {
  stb: "bg-emerald-900",
  metrorex: "bg-sky-950",
  integrated: "bg-slate-700",
};

type PendingChange = { newPrice: number };

type Props = {
  fare: Fare;
  pendingChange?: PendingChange;
};

const FareCard = ({ fare, pendingChange }: Props) => {
  return (
    <div className={`${operatorBg[fare.operator]} text-white rounded-lg flex ${pendingChange ? "ring-1 ring-orange-500/60" : ""}`}>
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-base leading-snug mb-2">{fare.name}</h3>

        <div className="text-sm text-gray-300 space-y-1">
          {fare.category === "trip" && (
            <>
              <p>Preț per călătorie: {pricePerTrip(fare).toFixed(2)} RON</p>
              {fare.validityMinutes && <p>Valabilitate: {fare.validityMinutes} min</p>}
              {fare.transferable && <p>Transfer între linii inclus</p>}
            </>
          )}

          {fare.category === "time-pass" && (
            <>
              <p>Valabilitate: {fare.duration.value} {fare.duration.unit}</p>
              <p>Necesită validare la prima utilizare</p>
              {fare.activationWindowMinutes && (
                <p>Fereastră activare: {fare.activationWindowMinutes} min</p>
              )}
            </>
          )}

          {fare.category === "subscription" && (
            <>
              <p>Valabilitate: {fare.duration.value} {fare.duration.unit}</p>
              {fare.nominalRequired && <p>Necesită card nominal</p>}
            </>
          )}
        </div>
      </div>

      <div className="border-l border-white/10 flex flex-col items-center justify-center px-4 w-24 shrink-0 gap-1">
        <span className={`text-lg font-bold whitespace-nowrap ${pendingChange ? "line-through text-white/40 text-sm" : ""}`}>
          {fare.price} RON
        </span>
        {pendingChange && (
          <span className="text-orange-400 font-bold text-base whitespace-nowrap">
            {pendingChange.newPrice} RON
          </span>
        )}
      </div>
    </div>
  );
};

export default FareCard;
