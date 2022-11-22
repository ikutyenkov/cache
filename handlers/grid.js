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

            Interface.getInstance(_instance).awaitSubscribe('getGrid', this.get.bind(_bindObject));
            Interface.getInstance(_instance).awaitSubscribe('clearGrid', this.clear.bind(_bindObject));
        }
    }

    async get(params)
    {
        if (typeof params.type != 'undefined' && params.group) {

            let _grid = await this.instance.isset(params.type).grid;
            let _answer = {};

            if (typeof params.group !== 'object')
                params.group = [params.group];

            for (let _key of params.group)
                _answer[_key] = await _grid.get(_key);

            return _answer;
        }

        return false;
    }

    async clear(params)
    {
        if (typeof params.type != 'undefined' && typeof params.group != 'undefined') {

            let _grid = await this.instance.isset(params.type).grid;

            if (typeof params.group !== 'object')
                params.group = [params.group];

            for (let _key of params.group) {

                if (!await _grid.clear(_key))
                    return false;
            }
        }

        return true;
    }
}

const handler = new Handler();

(async ()=> {
    await handler.init();
})();

module.exports = handler;