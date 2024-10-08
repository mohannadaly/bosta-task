import { Address, ShipmentStatus, TransitEvent } from './util';

export interface ShipmentResponse {
  provider: string;
  Type: 'SEND' | 'RTO';
  ScheduleDate: string;
  CurrentStatus: ShipmentStatus;
  TrackingNumber: number;
  CreateDate: string;
  DropOffAddress: Address;
  PromisedDate: string;
  isEditableShipment: boolean;
  nextWorkingDay: [
    {
      dayDate: string;
      dayName: string;
    }
  ];
  collectedFromBusiness: string;
  canRequestPOSMachine: boolean;
  deliveryCountryCode: string;
  TransitEvents?: TransitEvent[];
  isDraftOrder: boolean;
}
