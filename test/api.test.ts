import API from "../src/API/API.ts";
import { City, Order } from "../src/types.ts";

Deno.test("Testing the public API to catch data about the product", async () => {
  let api = new API();
  await api.fetchProduct({
    name: "T4_BAG",
    qualities: new Set(["1", "2"]),
    city: City.Martlock,
  });
  await api.fetchProduct({
    name: "T4_BAG",
    qualities: "4",
    city: new Set([City.Martlock, City.Bridgewatch]),
  });
});
