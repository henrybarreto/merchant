import Denomander from '/local/Denomander/mod.ts';
import {main} from './mod.ts';

const program = new Denomander({
  app_name: "Merchant",
  app_version: "1.0.0",
  app_description: "Albion Online trader helper"
});

try {
program
  .command("product", "Show information about items")
  .requiredOption("-n, --name", "Name of the product")
  .requiredOption("-q, --qualities", "Item qualities")
  .requiredOption("-c, --cities", "Name of the cities")
  .option("-o, --order", "Order the result by: [price | qualities]")
  .action(() => {
    main(program);
  })
  .parse(Deno.args);
} catch(error) {
  console.log(error.message);
  Deno.exit(1);
}

/*const listOfItensFetchedFromApi = await fetchProducts
  (
  ["T4_BAG"],
  [1,2,3,4],
  ['Bridgewatch',
    'Martlock',
    'FortSterling',
    'Thetford',
    'Lymhurst']
   );*/
  
/*
const merchant: CommanderInfo = {
  name: 'merchant',
  description: 'Albion trade assistence',
  version: '1.0.0',
  author: 'Henry Barreto'
}

const args = parse(Deno.args);
((args) => {
  const nothing: Command = {
    name: 'e', 
    action: () => {
      console.log("--help to see command what will help");
    }
  }
  const help: Command = {
    name: 'help',
    action: () => {
      console.log(`${merchant.name} ${merchant.version}`);
      console.log(`${merchant.description}`);
      console.log('');
      console.log('USAGE:');
      console.log('\t merchant [OPTIONS]\n');
      console.log('OPTIONS:');
      console.log('--help');
      console.log('\t Prints help information\n');
      console.log('--version');
      console.log('\t Shows the version\n');
      console.log('--product <items name> <items qualities> <cities>');
      console.log('\t Shows information about items\n');
      console.log('--order [price | quality]');
      console.log('\t Order products fetched by\n');
      Deno.exit(1);
    }
  }
  const version: Command = {
    name: 'version',
    action: () => {
      console.log(`merchant ${merchant.version}`);
      console.log(`Author ${merchant.author}`);
      Deno.exit(0);
    }
  }
  const product: Command = {
    name: 'product',
    action: async (args, first, ...others) => {
      try {
        const parms = {
          productName: first,
          qualities: others[0],
          cities: others[1]
        }
        if(!parms.qualities && !parms.cities) {
          console.warn('You need specify the quelities and cities');
          console.log('ex: merchant T4_BAG 1,2,3,4 Martlock');
          Deno.exit(1);
        }

        const fetchedProducts = async (parms: any) => {
          return await fetchProducts(parms.productName, parms.qualities, parms.cities);      
        }

        const subCommander = new Commander(args);
        subCommander.define({
          name: 'order',
          action: async (args, value) => {
            switch(value) {
              case 'price': {
                const productsFetched = await fetchedProducts(parms);      
                const productsOrdernedByPrice = orderProductsByPrice(productsFetched);
                console.log(productsOrdernedByPrice);
                Deno.exit(0);
              }
              case 'quality': {
                const productsFetched = await fetchedProducts(parms);      
                const productsOrdernedByQuality = orderProductsByQuality(productsFetched);
                console.log(productsOrdernedByQuality);
                Deno.exit(0);
              }
              case true || false: {
                const productsFetched = await fetchedProducts(parms);      
                console.log(productsFetched);
                Deno.exit(0);
              }
              default: {
                console.log('No order defined!');
                Deno.exit(1);
              }
            }
          }
        });
        subCommander.watch();

        console.log(await fetchedProducts(parms));
        Deno.exit(0);
      } catch(e) {
        console.error(e);
        Deno.exit(1);
      }
    }
  }

  // ------------------------------------------------->

  const commander = new Commander(args);
  commander.define(nothing);
  commander.define(help);
  commander.define(version);
  commander.define(product);

  commander.watch();
})(args)
*/