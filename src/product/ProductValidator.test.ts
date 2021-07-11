import { assertEquals } from "../../deps.ts";
import { Cities } from "../types.ts";
import ProductValidator from "./ProductValidator.ts";

Deno.test("Test the validation of the product qualities when values are valid", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities(
    "1,2,3",
  );
  assertEquals(productQualities, new Set([1, 2, 3]));
});
Deno.test("Test the validation of the product qualities when values are invalid, but with comma", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities(
    "invalid,invalid_2,invalid_3",
  );
  assertEquals(productQualities, new Set([1, 2, 3, 4, 5]));
});

Deno.test("Test the validation of the product qualites when value is a single number", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("1");
  assertEquals(productQualities, new Set([1]));
});

Deno.test("Test the validation of product qualities when value is empty", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("");
  assertEquals(productQualities, new Set([1, 2, 3, 4, 5]));
});

Deno.test("Test the validation of product qualities when value is out qualities' range", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities(
    "1,2,3,4,5,6,7,8,9",
  );
  assertEquals(productQualities, new Set([1, 2, 3, 4, 5]));
});

Deno.test("Test the validation of product cities when cities are valid", () => {
  const productCities: Set<Cities> = ProductValidator.validateCities(
    "martlock,bridgewatch",
  );
  assertEquals(productCities, new Set([Cities.Martlock, Cities.Bridgewatch]));
});
Deno.test("Test the validation of product cities when cities are invalid", () => {
  const productCities: Set<Cities> = ProductValidator.validateCities(
    "invalid_martlock,invalid_bridgewatch",
  );
  assertEquals(
    productCities,
    new Set([
      Cities.Thetford,
      Cities.Martlock,
      Cities.Lymhurst,
      Cities.Fortsterling,
      Cities.Bridgewatch,
    ]),
  );
});
Deno.test("Test the validation of product cities when cities are empty", () => {
  const productCities: Set<Cities> = ProductValidator.validateCities("");
  assertEquals(
    productCities,
    new Set([
      Cities.Thetford,
      Cities.Martlock,
      Cities.Lymhurst,
      Cities.Fortsterling,
      Cities.Bridgewatch,
    ]),
  );
});
