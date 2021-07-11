import { assertEquals } from "../../deps.ts";
import ProductValidator from "./ProductValidator.ts";

Deno.test("Test the validation of the product qualities when values are valid", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("1,2,3");
  assertEquals(productQualities, new Set([1, 2, 3]));
});
Deno.test("Test the validation of the product qualities when values is invalid, but with comma", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("invalid,invalid_2,invalid_3");
  assertEquals(productQualities, new Set([1,2,3,4,5]));
});

Deno.test("Test the validation of the product qualites when value in a single number", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("1");
  assertEquals(productQualities, new Set([1]));
});

Deno.test("Test the validation of product qualities when value is empty", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("");
  assertEquals(productQualities, new Set([1,2,3,4,5]));
});

Deno.test("Test the validation of product qualities when value is out qualities' range", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("1,2,3,4,5,6,7,8,9");
  assertEquals(productQualities, new Set([1,2,3,4,5]));
});

Deno.test("Test the validation of product qualities when generate a string", () => {
  const productQualities: Set<number> = ProductValidator.validateQualities("1,2,3,4,5");
  assertEquals(productQualities, new Set([1,2,3,4,5]));
});