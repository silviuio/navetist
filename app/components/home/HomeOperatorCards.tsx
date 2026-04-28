import { Operator } from "@/app/types/fares";
import HomeOperatorCard from "./HomeOperatorCard";

type OperatorConfig = {
  key: Operator;
  href: string;
  title: string;
  color: string;
};

const operators: OperatorConfig[] = [
  {
    key: "metrorex",
    href: "/metrorex",
    title: "Tarife Metrorex",
    color: "border-sky-700",
  },
  {
    key: "stb",
    href: "/stb",
    title: "Tarife STB",
    color: "border-emerald-600",
  },
  {
    key: "integrated",
    href: "/integrat",
    title: "Tarife integrate",
    color: "border-slate-500",
  },
];

export default function HomeOperatorCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {operators.map((operator) => (
        <HomeOperatorCard
          key={operator.key}
          operatorKey={operator.key}
          href={operator.href}
          title={operator.title}
          color={operator.color}
        />
      ))}
    </div>
  );
}
