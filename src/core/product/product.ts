import { Product } from "../../types.ts";
import {
  productValidateCities,
  productValidateName,
  productValidateQualities,
} from "./validator.ts";

export default function productCreate(
  name: string,
  citiesString: string,
  qualitesString: string,
): Product | undefined {
  if (!productValidateName(name)) return undefined;

  const cities = productValidateCities(citiesString);
  if (!cities) return undefined;

  const qualites = productValidateQualities(qualitesString);
  if (!qualites) return undefined;

  return { name: name, cities: cities, qualities: qualites };
}
