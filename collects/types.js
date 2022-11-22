const Type = require("../controllers/values/type.js");

class Collect
{
    constructor(instance)
    {
        this._instance = instance;
        this._types = {};
    }

    isset(type)
    {
        if (typeof this._types[type] == 'undefined')
            this._types[type] = new Type(type, this._instance);

        return this._types[type];
    }
}

module.exports = Collect;