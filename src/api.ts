export async function fetchProducts
  (
    productsName: string,
    productQualities: string,
    citiesFromProducts: string
  ): Promise<IProduct[]> {
  const productsFetched: IProduct[] = await fetchItemsData(productsName, productQualities, citiesFromProducts);
  
  return productsFetched;
}

async function fetchItemsData
  (
    productsName: string,
    productQualities: string,
    citiesFromProducts: string
  ): Promise<IProduct[]> {
  
  const payloadProduct: string = `https://www.albion-online-data.com/api/v2/stats/prices/${productsName}`;
  const payloadLocation: string = `?locations=${citiesFromProducts}`;
  const payloadQualities: string = `&qualities=${productQualities}`;

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
  const productsFetched: IProduct[] = await fetchedActionResult.json();

  return productsFetched;
}

export interface IProduct {
  item_id: string,
  city: string,
  quality: number,
  sell_price_min: number,
  sell_price_min_date: string,
  sell_price_max: number,
  sell_price_max_date: string,
  buy_price_min: number,
  buy_price_min_date: string,
  buy_price_max: number,
  buy_price_max_date: string
}