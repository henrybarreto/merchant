import { fetchProducts } from "../src/api.ts";
import { Order } from "../src/types.ts";

Deno.test("Testing the public API to catch data about the products", async () => {
  await fetchProducts({
    name: "T4_BAG",
    qualities: "1,2",
    cities: "martlock",
    order: Order.PRICE,
  });
  await fetchProducts({
    name: ["T4_BAG", "T5_BAG"],
    qualities: "1,2,3,4",
    cities: ["martlock", "bridgewatch"],
    order: Order.PRICE,
  });
});
