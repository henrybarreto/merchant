# Merchant
## Albion Online trader helper
This a simple tool to compare items' price and help Albion's trader to be more profitable.

It uses the public API from [Albion Online Data](https://www.albion-online-data.com/) to get the prices and try to compare them.

## About the code
I make it with the possibilities of unit tests, but i doesn't implement that yet, but as soon as i can, i will do that.
I also have in mind to abstract the name of cities to remove the needed to write the all name to the API or became that CLI in a graphic application.


## How to use

It's possible to install using Deno:
```bash
deno install --allow-net merchant.js
```

After that, the call "merchant" is available in the terminal

```bash
merchant 1.0.0
Albion trade assistence

USAGE:
         merchant [OPTIONS]

OPTIONS:
--help
         Prints help information

--version
         Shows the version

--product <items name> <items qualities> <cities>
         Shows information about items

--order [price | quality]
         Order products fetched by
```
### Example

```bash
merchant --product T4_BAG 3,4 Martlock,Bridgewatch
```
Or if you want to organize the output by price
```bash
merchant --product T4_BAG 3,4 Martlock,Bridgewatch --order price
```