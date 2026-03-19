export interface Settlement {
  Present: string;
  MainDescription: string;
  Area: string;
  DeliveryCity: string;
  Ref: string;
}

export interface Warehouse {
  Description: string;
  Ref: string;
  ShortAddress?: string;
  Phone?: string;
  Number?: string;
  CityRef?: string;
  CityDescription?: string;
  Longitude?: string;
  Latitude?: string;
  Schedule?: Record<string, string>;
  CategoryOfWarehouse?: string;
}

export interface SearchSettlementsResponse {
  success: boolean;
  data: Array<{
    TotalCount: number;
    Addresses: Settlement[];
  }>;
}

export interface WarehousesResponse {
  success: boolean;
  data: Warehouse[];
}

export type GetWarehousesMethodProperties = {
  SettlementRef: string;
  WarehouseId?: string;
  Page: string;
  Limit: string;
  Language: string;
};
