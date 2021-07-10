import { assertEquals, assertExists } from "../../deps.ts";
import { Order } from "../types.ts";
import CliValidator from "./CliValidator.ts";

Deno.test("Test the order validation when receive a valid value from CLI", () => {
  const order: Order = CliValidator.validateOrder("quality");
  assertEquals(order, Order.Quality);
});

Deno.test("Test the order validation when receive a invalid value from CLI", () => {
  const order: Order = CliValidator.validateOrder("invalid");
  assertEquals(order, Order.Price);
});
