import { z } from "zod";
import rawData from "../data/fares.json";
import type { Fare, TripFare, SubscriptionFare, FaresData, Operator, Scope } from "../types/fares";

// --- Zod schemas ---

const OperatorSchema = z.enum(["stb", "metrorex", "integrated"]);
const ScopeSchema = z.enum(["surface", "metro", "integrated"]);

const DurationSchema = z.object({
  value: z.number().positive(),
  unit: z.enum(["hours", "days", "months"]),
});

const FareBaseSchema = z.object({
  id: z.string().min(1),
  operator: OperatorSchema,
  scope: ScopeSchema,
  name: z.string().min(1),
  price: z.number().nonnegative(),
});

const TripFareSchema = FareBaseSchema.extend({
  category: z.literal("trip"),
  trips: z.number().int().positive(),
  transferable: z.boolean(),
  validityMinutes: z.number().positive().optional(),
});

const TimePassFareSchema = FareBaseSchema.extend({
  category: z.literal("time-pass"),
  duration: DurationSchema,
  activationRequired: z.boolean(),
  activationWindowMinutes: z.number().positive().optional(),
  nominalRequired: z.boolean().optional(),
});

const SubscriptionFareSchema = FareBaseSchema.extend({
  category: z.literal("subscription"),
  duration: DurationSchema,
  nominalRequired: z.boolean().optional(),
  activationWindowMinutes: z.number().positive().optional(),
});

const FareSchema = z.discriminatedUnion("category", [
  TripFareSchema,
  TimePassFareSchema,
  SubscriptionFareSchema,
]);

const DiscountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  operator: OperatorSchema,
  percentage: z.number().min(0).max(100),
  appliesTo: z.array(z.string()),
  discountedPrice: z.number().nonnegative(),
  documentation: z.string().optional(),
  eligibility: z.string().optional(),
  constraints: z.string().optional(),
});

const GratuitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  operator: OperatorSchema,
  scope: ScopeSchema,
});

const FaresDataSchema = z.object({
  meta: z.object({
    lastUpdated: z.string(),
    currency: z.string(),
    sources: z.record(z.string(), z.string()),
  }),
  operators: z.record(z.string(), z.object({ name: z.string(), fullName: z.string() })),
  fares: z.array(FareSchema),
  discounts: z.array(DiscountSchema),
  gratuities: z.array(GratuitySchema),
});

// Validated at module load — throws at build time if fares.json is malformed
const data: FaresData = FaresDataSchema.parse(rawData);

// --- Queries ---

export function getFareById(id: string): Fare | undefined {
  return data.fares.find((f) => f.id === id);
}

export function getFaresByOperator(operator: Operator): Fare[] {
  return data.fares.filter((f) => f.operator === operator);
}

export function getFaresByScope(scope: Scope): Fare[] {
  return data.fares.filter((f) => f.scope === scope);
}

export function getTripFares(scope?: Scope): TripFare[] {
  return data.fares.filter(
    (f): f is TripFare => f.category === "trip" && (!scope || f.scope === scope)
  );
}

export function getSubscriptions(scope?: Scope): SubscriptionFare[] {
  return data.fares.filter(
    (f): f is SubscriptionFare =>
      f.category === "subscription" && (!scope || f.scope === scope)
  );
}

export function getDiscountsByFareId(fareId: string) {
  return data.discounts.filter((d) => d.appliesTo.includes(fareId));
}

// --- Calcule ---

export function pricePerTrip(fare: TripFare): number {
  return fare.price / fare.trips;
}

// Prețul unei singure călătorii pentru un operator (biletul 1-călătorie)
export function getSingleTripFare(operator: Operator): TripFare | undefined {
  return data.fares.find(
    (f): f is TripFare => f.operator === operator && f.category === "trip" && f.trips === 1
  );
}

// De la câte călătorii pe lună merită abonamentul față de biletul individual
export function breakevenTrips(tripFare: TripFare, subscriptionFare: SubscriptionFare): number {
  return Math.ceil(subscriptionFare.price / pricePerTrip(tripFare));
}

// Costul real al X călătorii cu un anumit tip de bilet (ex: pachete de 10)
export function costForTrips(tripFare: TripFare, tripCount: number): number {
  const ticketsNeeded = Math.ceil(tripCount / tripFare.trips);
  return ticketsNeeded * tripFare.price;
}

export { data as faresData };
