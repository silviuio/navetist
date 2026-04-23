export type Operator = "stb" | "metrorex" | "integrated";
export type Scope = "surface" | "metro" | "integrated";
export type DurationUnit = "hours" | "days" | "months";

export type Duration = {
  value: number;
  unit: DurationUnit;
};

type FareBase = {
  id: string;
  operator: Operator;
  scope: Scope;
  name: string;
  price: number;
};

export type TripFare = FareBase & {
  category: "trip";
  trips: number;
  transferable: boolean;
  validityMinutes?: number;
};

export type TimePassFare = FareBase & {
  category: "time-pass";
  duration: Duration;
  activationRequired: boolean;
  activationWindowMinutes?: number;
  nominalRequired?: boolean;
};

export type SubscriptionFare = FareBase & {
  category: "subscription";
  duration: Duration;
  nominalRequired?: boolean;
  activationWindowMinutes?: number;
};

export type Fare = TripFare | TimePassFare | SubscriptionFare;

export type Discount = {
  id: string;
  name: string;
  operator: Operator;
  percentage: number;
  appliesTo: string[];
  discountedPrice: number;
  documentation?: string;
  eligibility?: string;
  constraints?: string;
};

export type Gratuity = {
  id: string;
  name: string;
  operator: Operator;
  scope: Scope;
};

export type OperatorInfo = {
  name: string;
  fullName: string;
};

export type FaresData = {
  meta: {
    lastUpdated: string;
    currency: string;
    sources: Record<string, string>;
  };
  operators: Record<Operator, OperatorInfo>;
  fares: Fare[];
  discounts: Discount[];
  gratuities: Gratuity[];
};
