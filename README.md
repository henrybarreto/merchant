# Merchant

![Merchant logo](https://imgur.com/QGsGqfh)

## Albion Online trader helper

This a simple tool to compare item's price and help Albion's trader to be more
profitable.

It uses the public API from
[Albion Online Data](https://www.albion-online-data.com/) to get the prices and
try to compare them.

## About the code

- I make it with the possibilities of unit tests, but i doesn't implement that
  yet, but as soon as i can, i will do that.
- I also have in mind to abstract the name of cities to remove the needed to
  write the all name to the API.
- Error handling is still not working, so error with pass through

## How to use

A binary called "merchant" is available from the root of project

```bash
Merchant
v1.0.0

Description:
Albion Online trader helper

Options:
-h --help        Help Screen
-V --version     Version

Commands:
product          Show information about items
```

### Example

Basic usage

```bash
./merchant product -n T4_BAG -q 3,4 -c martlock,bridgewatch
```

Organize the output by price

```bash
./merchant product -n T4_BAG,T5_BAG,T6_BAG -q 3,4,5 -c martlock,bridgewatch --order price
```

With default params

```bash
./merchant product -n T4_BAG,T5_BAG
```
