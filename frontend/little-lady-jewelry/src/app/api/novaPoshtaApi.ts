import axios from "axios";

const BASE_URL_NOVA_POSHTA_API =
  process.env.BASE_URL_NOVA_POSHTA_API ||
  "https://api.novaposhta.ua/v2.0/json/";
const API_KEY_NOVA_POSHTA = process.env.API_KEY_NOVA_POSHTA as string;

interface Settlement {
  Present: string;
  MainDescription: string;
  Area: string;
  DeliveryCity: string;
  Ref: string;
}

interface Warehouse {
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
}

interface SearchSettlementsResponse {
  success: boolean;
  data: Array<{
    TotalCount: number;
    Addresses: Settlement[];
  }>;
}

interface WarehousesResponse {
  success: boolean;
  data: Warehouse[];
}

export async function searchSettlements(query: string, limit = 20, page = 1) {
  try {
    const { data } = await axios.post<SearchSettlementsResponse>(
      BASE_URL_NOVA_POSHTA_API,
      {
        apiKey: API_KEY_NOVA_POSHTA,
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: query,
          Limit: limit.toString(),
          Page: page.toString(),
        },
      },
    );
    if (!data.success) throw new Error("API повернув помилку");
    return data.data[0]?.Addresses || [];
  } catch (err) {
    console.error("Помилка Nova Poshta API:", err);
    return [];
  }
}

export async function getWarehouses(
  settlementRef: string,
  warehouseId?: string,
): Promise<Warehouse[]> {
  try {
    const methodProperties: any = {
      SettlementRef: settlementRef,
      Page: "1",
      Limit: "50",
      Language: "UA",
    };

    if (warehouseId) {
      methodProperties.WarehouseId = warehouseId;
    }

    const { data } = await axios.post<WarehousesResponse>(
      BASE_URL_NOVA_POSHTA_API,
      {
        apiKey: API_KEY_NOVA_POSHTA,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties,
      },
    );

    if (!data.success) throw new Error("API повернув помилку відділення");
    return data.data || [];
  } catch (err) {
    console.error("Помилка відділення Nova Poshta API:", err);
    return [];
  }
}
