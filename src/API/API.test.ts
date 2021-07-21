import API from "./API.ts";
import { assertEquals } from "../../deps.ts";
Deno.test("Testing API bind argumentes", () => {
  assertEquals(
    API.createPayload("a", "b", "c", "d"),
    "a,b,c,d",
  );
});
