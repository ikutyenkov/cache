const Interface = require("../class/interface.js");
const instances = require("../collects/instances.js");

class Handler
{
    constructor()
    {
        Interface.getInstance().getModule("importer").subscribe("update", this.clearByParams);
    }

    async clearByParams(params)
    {
        if (typeof params.instance != 'undefined' && typeof params.type != 'undefined' && typeof params.group != 'undefined') {

            let _grid = await instances.getInstance(params.instance).isset(params.type).grid;

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

module.exports = new Handler();