import axios from 'axios';
import { ShipmentResponse } from '../types/shipment';

export function getShipment(
  shipmentId: number,
  lang: string = 'en',
  signal?: AbortSignal
) {
  const headers = {
    'X-Requested-By': 'Bosta',
  };
  return axios.get<ShipmentResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/shipments/track/${shipmentId}?lang=${lang}`,
    {
      headers,
      signal,
    }
  );
}
