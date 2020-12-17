import {fetchProducts} from './api.ts';

Deno.test('Testing the public API to catch data about the products', async () => {
  await fetchProducts({
    name: 'T4_BAG',
    qualities: '1,2',
    cities: 'martlock',
    order: 'price'
  });
  await fetchProducts({
    name: ['T4_BAG', 'T5_BAG'],
    qualities: '1,2,3,4',
    cities: ['martlock', 'bridgewatch'],
    order: 'price'
  });
});