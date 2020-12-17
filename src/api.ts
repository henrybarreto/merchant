import {ProductFromAPI, Product} from './types.d.ts';
export async function fetchProducts
  (
    product: Product
  ): Promise<ProductFromAPI[]> {
  const productsFetched: ProductFromAPI[] = await fetchItemsData(product);
  
  return productsFetched;
}

async function fetchItemsData
  (
    product: Product
  ): Promise<ProductFromAPI[]> {
  
  const payloadProduct: string = `https://www.albion-online-data.com/api/v2/stats/prices/${product.name.toString()}`;
  const payloadLocation: string = `?locations=${product.cities.toString()}`;
  const payloadQualities: string = `&qualities=${product.qualities.toString()}`;

  const createPayload = (...args: any[]) => {
    let payload: string = '';
    args.map((arg) => {
      if(arg) {
        payload += arg;
      }
    });

    return payload;
  }
  const payload: string = createPayload
  ( payloadProduct, 
    payloadLocation, 
    payloadQualities);
    
  const fetchedActionResult: Response = await fetch(payload, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const productsFetched: ProductFromAPI[] = await fetchedActionResult.json();

  return productsFetched;
}