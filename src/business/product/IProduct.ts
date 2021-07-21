import { Cities, Qualities } from "../../types.ts";

export interface IProduct {
  name: String;
  qualities: Set<Qualities>;
  cities: Set<Cities>;
}
