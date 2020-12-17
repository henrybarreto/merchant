/**
 * This is a temp implementation
 */
import {orderProductsByPrice, orderProductsByQuality} from '../src/analysis.ts';
import {fetchProducts} from '../src/api.ts';
import Denomander from '../../../Github/denomander/denomander/mod.ts';
import {Product, Order, ProductFromAPI} from './types.d.ts';

function orderAnalisys
<F extends () => Promise<ProductFromAPI[]>, 
P extends [OrderPair: Order, fn: F]>
(order: Order, ...pairs: P[] ): any {
  const pair = pairs.reduce((accPair: P ,currentPair: P) => {
      if (currentPair[0] == order) {
        return currentPair;
      }
      return accPair;
    })

  return pair[1]();
}

export async function request
({
  name, 
  qualities = '1,2,3,4,5', 
  cities = ['martlock', 'thetford', 'lymhurst', 'fortsterling', 'bridgewatch'],
  order = 'price'
}: Product) {
  if(typeof name == 'boolean') {
    throw new Error('A item\'s name is required!');
  }

  const product: Product = {
    name,
    qualities,
    cities,
    order
  }

  return orderAnalisys(order,
    ['price', async () => {
      return orderProductsByPrice(await fetchProducts(product)) 
    }],
    ['quality', async () => {
      return orderProductsByQuality(await fetchProducts(product))
    }]
  );
}

export async function show(product: Product) {
  try {
    console.log('Making the resquest to the server...');
  const result: ProductFromAPI[] = await request(product);
    console.clear();
    console.log(`Items ordened by ${product.order}`);
  return result?.map((item: ProductFromAPI) => {
    console.log(`\r\nItem ${item!.item_id}`);
    console.log(`Quality ${item.quality}`);
    console.log(`at ${item.city}`);
    console.log(`Minimun sell price: ${item.sell_price_min}`);
    console.log(`Maximun sell price: ${item.sell_price_max}`);
    console.log(`Minimun buy price: ${item.buy_price_min}`);
    console.log(`Maximun buy price: ${item.buy_price_max}`);
  })
  } catch(error) {
    console.error(error.message);
    Deno.exit(1);
  }
}

export function main(program: Denomander) {
  const {name, qualities, cities, order} = program;
  show({
    name,
    qualities,
    cities,
    order
  });
}