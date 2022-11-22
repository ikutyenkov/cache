const Interface = require("../class/interface.js");
const instances = require("../collects/instances.js");

class Handler
{
    async init()
    {
        for (let _instance of (await Interface.getInstance().getModule('auth').await('getInstances') ?? [])) {

            let _bindObject = {
                "self": this,
                "instance": instances.getInstance(_instance)
            };

            Interface.getInstance(_instance).awaitSubscribe('get', this.get.bind(_bindObject));
            Interface.getInstance(_instance).awaitSubscribe('set', this.set.bind(_bindObject));
        }
    }

    async get(params)
    {
        if (typeof params.type != 'undefined' && params.group)
            return await this.instance.isset(params.type).isset(params.group).value();

        return false;
    }

    async set(params)
    {
        if (typeof params.type != 'undefined' && typeof params.group != 'undefined')
            return await this.instance.isset(params.type).isset(params.group).value(params.value ?? undefined);

        return false;
    }
}

const handler = new Handler();

(async ()=> {
    await handler.init();
})();

module.exports = handler;