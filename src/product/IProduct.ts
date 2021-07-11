import { City, Qualities } from "../types.ts";

export interface IProduct {
  name: String;
  qualities: Set<Qualities>;
  city: Set<City>;
}
