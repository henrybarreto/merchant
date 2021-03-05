import { City } from "../types.ts";

export interface IProduct {
  name: string;
  qualities: string | Set<string>;
  city: City | Set<City>;
}
