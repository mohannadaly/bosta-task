export interface ErrorResponse {
  error: string;
  status: string;
}

export interface Entity {
  _id: string;
  name: string;
  nameAr?: string;
}

export interface Address {
  country: Entity & {
    code: string;
  };
  city: Entity & {
    sector: 1;
  };
  zone?: Entity;
  district?: Entity;
  firstLine: string;
  secondLine: string;
  buildingNumber?: number;
  floor?: number;
  apartment?: number;
  geoLocation?: [number, number];
}

export interface ShipmentStatus {
  state: string; // Delivered: 45, Returned: 46, On hold: 49
  code: ShipmentState;
  timestamp: string;
}

export interface TransitEvent {
  timestamp: string;
  state: string;
  msg?: string;
  code?: ShipmentState;
}

export enum ShipmentState {
  UNDER_REVIEW = 41,
  CREATED = 42,
  PICKED = 43,
  ENROUTE = 44,
  DELIVERED = 45,
  RETURNED = 46,
  DELETED = 48,
  ON_HOLD = 49,
  CANCELLED = 50,
}
