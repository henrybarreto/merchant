function percentOver(from, to) {
    return -100 * (from / to) - 1;
}
function orderProductsByPrice(productList) {
    return productList.sort((a, b)=>{
        return a.sell_price_min > b.sell_price_min ? 1 : -1;
    });
}
function orderProductsByQuality(productList) {
    return productList.sort((a, b)=>{
        return a.quality > b.quality ? 1 : -1;
    });
}
async function fetchItemsData(productsName, productQualities, citiesFromProducts) {
    const payloadProduct = `https://www.albion-online-data.com/api/v2/stats/prices/${productsName}`;
    const payloadLocation = `?locations=${citiesFromProducts}`;
    const payloadQualities = `&qualities=${productQualities}`;
    const createPayload = (...args)=>{
        let payload = '';
        args.map((arg)=>{
            if (arg) {
                payload += arg;
            }
        });
        return payload;
    };
    const payload = createPayload(payloadProduct, payloadLocation, payloadQualities);
    const fetchedActionResult = await fetch(payload, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const productsFetched = await fetchedActionResult.json();
    return productsFetched;
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
function get(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
}
function getForce(obj, key) {
    const v = get(obj, key);
    assert(v != null);
    return v;
}
function isNumber(x) {
    if (typeof x === "number") return true;
    if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}
function hasKey(obj, keys) {
    let o = obj;
    keys.slice(0, -1).forEach((key)=>{
        o = get(o, key) ?? {
        };
    });
    const key = keys[keys.length - 1];
    return key in o;
}
function parse(args, { "--": doubleDash = false , alias ={
} , boolean =false , default: defaults = {
} , stopEarly =false , string =[] , unknown =(i)=>i
  } = {
}) {
    const flags = {
        bools: {
        },
        strings: {
        },
        unknownFn: unknown,
        allBools: false
    };
    if (boolean !== undefined) {
        if (typeof boolean === "boolean") {
            flags.allBools = !!boolean;
        } else {
            const booleanArgs = typeof boolean === "string" ? [
                boolean
            ] : boolean;
            for (const key of booleanArgs.filter(Boolean)){
                flags.bools[key] = true;
            }
        }
    }
    const aliases = {
    };
    if (alias !== undefined) {
        for(const key in alias){
            const val = getForce(alias, key);
            if (typeof val === "string") {
                aliases[key] = [
                    val
                ];
            } else {
                aliases[key] = val;
            }
            for (const alias1 of getForce(aliases, key)){
                aliases[alias1] = [
                    key
                ].concat(aliases[key].filter((y)=>alias1 !== y
                ));
            }
        }
    }
    if (string !== undefined) {
        const stringArgs = typeof string === "string" ? [
            string
        ] : string;
        for (const key of stringArgs.filter(Boolean)){
            flags.strings[key] = true;
            const alias1 = get(aliases, key);
            if (alias1) {
                for (const al of alias1){
                    flags.strings[al] = true;
                }
            }
        }
    }
    const argv = {
        _: []
    };
    function argDefined(key, arg) {
        return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
    }
    function setKey(obj, keys, value) {
        let o = obj;
        keys.slice(0, -1).forEach(function(key) {
            if (get(o, key) === undefined) {
                o[key] = {
                };
            }
            o = get(o, key);
        });
        const key = keys[keys.length - 1];
        if (get(o, key) === undefined || get(flags.bools, key) || typeof get(o, key) === "boolean") {
            o[key] = value;
        } else if (Array.isArray(get(o, key))) {
            o[key].push(value);
        } else {
            o[key] = [
                get(o, key),
                value
            ];
        }
    }
    function setArg(key, val, arg = undefined) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg, key, val) === false) return;
        }
        const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
        setKey(argv, key.split("."), value);
        const alias1 = get(aliases, key);
        if (alias1) {
            for (const x of alias1){
                setKey(argv, x.split("."), value);
            }
        }
    }
    function aliasIsBoolean(key) {
        return getForce(aliases, key).some((x)=>typeof get(flags.bools, x) === "boolean"
        );
    }
    for (const key of Object.keys(flags.bools)){
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    }
    let notFlags = [];
    if (args.includes("--")) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
    }
    for(let i = 0; i < args.length; i++){
        const arg = args[i];
        if (/^--.+=/.test(arg)) {
            const m = arg.match(/^--([^=]+)=(.*)$/s);
            assert(m != null);
            const [, key1, value] = m;
            if (flags.bools[key1]) {
                const booleanValue = value !== "false";
                setArg(key1, booleanValue, arg);
            } else {
                setArg(key1, value, arg);
            }
        } else if (/^--no-.+/.test(arg)) {
            const m = arg.match(/^--no-(.+)/);
            assert(m != null);
            setArg(m[1], false, arg);
        } else if (/^--.+/.test(arg)) {
            const m = arg.match(/^--(.+)/);
            assert(m != null);
            const [, key1] = m;
            const next = args[i + 1];
            if (next !== undefined && !/^-/.test(next) && !get(flags.bools, key1) && !flags.allBools && (get(aliases, key1) ? !aliasIsBoolean(key1) : true)) {
                setArg(key1, next, arg);
                i++;
            } else if (/^(true|false)$/.test(next)) {
                setArg(key1, next === "true", arg);
                i++;
            } else {
                setArg(key1, get(flags.strings, key1) ? "" : true, arg);
            }
        } else if (/^-[^-]+/.test(arg)) {
            const letters = arg.slice(1, -1).split("");
            let broken = false;
            for(let j = 0; j < letters.length; j++){
                const next = arg.slice(j + 2);
                if (next === "-") {
                    setArg(letters[j], next, arg);
                    continue;
                }
                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                    setArg(letters[j], next.split(/=(.+)/)[1], arg);
                    broken = true;
                    break;
                }
                if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }
                if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j + 2), arg);
                    broken = true;
                    break;
                } else {
                    setArg(letters[j], get(flags.strings, letters[j]) ? "" : true, arg);
                }
            }
            const [key1] = arg.slice(-1);
            if (!broken && key1 !== "-") {
                if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !get(flags.bools, key1) && (get(aliases, key1) ? !aliasIsBoolean(key1) : true)) {
                    setArg(key1, args[i + 1], arg);
                    i++;
                } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
                    setArg(key1, args[i + 1] === "true", arg);
                    i++;
                } else {
                    setArg(key1, get(flags.strings, key1) ? "" : true, arg);
                }
            }
        } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
            }
            if (stopEarly) {
                argv._.push(...args.slice(i + 1));
                break;
            }
        }
    }
    for (const key1 of Object.keys(defaults)){
        if (!hasKey(argv, key1.split("."))) {
            setKey(argv, key1.split("."), defaults[key1]);
            if (aliases[key1]) {
                for (const x of aliases[key1]){
                    setKey(argv, x.split("."), defaults[key1]);
                }
            }
        }
    }
    if (doubleDash) {
        argv["--"] = [];
        for (const key2 of notFlags){
            argv["--"].push(key2);
        }
    } else {
        for (const key2 of notFlags){
            argv._.push(key2);
        }
    }
    return argv;
}
class Commander {
    listOfCommands = [];
    constructor(args){
        this.args = args;
    }
    define(command) {
        this.listOfCommands.push(command);
    }
    async watch() {
        this.listOfCommands.map(async (command)=>{
            if (this.args[command.name] != undefined) {
                command.action(this.args, this.args[command.name], ...this.args._);
            }
        });
    }
}
const merchant = {
    name: 'merchant',
    description: 'Albion trade assistence',
    version: '1.0.0',
    author: 'Henry Barreto'
};
const args1 = parse(Deno.args);
async function fetchProducts(productsName, productQualities, citiesFromProducts) {
    const productsFetched = await fetchItemsData(productsName, productQualities, citiesFromProducts);
    return productsFetched;
}
((args2)=>{
    const help = {
        name: 'help',
        action: ()=>{
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
    };
    const version = {
        name: 'version',
        action: ()=>{
            console.log(`merchant ${merchant.version}`);
            console.log(`Author ${merchant.author}`);
            Deno.exit(0);
        }
    };
    const product = {
        name: 'product',
        action: async (args3, first, ...others)=>{
            try {
                const parms = {
                    productName: first,
                    qualities: others[0],
                    cities: others[1]
                };
                if (!parms.qualities && !parms.cities) {
                    console.warn('You need specify the quelities and cities');
                    console.log('ex: merchant T4_BAG 1,2,3,4 Martlock');
                    Deno.exit(1);
                }
                const fetchedProducts = async (parms1)=>{
                    return await fetchProducts(parms1.productName, parms1.qualities, parms1.cities);
                };
                const subCommander = new Commander(args3);
                subCommander.define({
                    name: 'order',
                    action: async (args4, value)=>{
                        switch(value){
                            case 'price':
                                {
                                    const productsFetched = await fetchedProducts(parms);
                                    const productsOrdernedByPrice = orderProductsByPrice(productsFetched);
                                    console.log(productsOrdernedByPrice);
                                    Deno.exit(0);
                                }
                            case 'quality':
                                {
                                    const productsFetched = await fetchedProducts(parms);
                                    const productsOrdernedByQuality = orderProductsByQuality(productsFetched);
                                    console.log(productsOrdernedByQuality);
                                    Deno.exit(0);
                                }
                            case true || false:
                                {
                                    const productsFetched = await fetchedProducts(parms);
                                    console.log(productsFetched);
                                    Deno.exit(0);
                                }
                            default:
                                {
                                    console.log('No order defined!');
                                    Deno.exit(1);
                                }
                        }
                    }
                });
                subCommander.watch();
                console.log(await fetchedProducts(parms));
                Deno.exit(0);
            } catch (e) {
                console.error(e);
                Deno.exit(1);
            }
        }
    };
    const commander = new Commander(args2);
    commander.define(help);
    commander.define(version);
    commander.define(product);
    commander.watch();
})(args1);
