const Model = require("../values.js");
const cache = require("../cache.js");

class Controller extends Model
{
    constructor(group, instance)
    {
        super(group, instance);
    }

    async value(value)
    {
        if (typeof value != 'undefined')
            return await this.set(value);

        return await this.get();
    }

    async get()
    {
        return await cache.get(this._hash);
    }

    async set(value)
    {
        if (await cache.set(this._hash, value)) {

            if (typeof this._index == 'object')
                this._instance.grid.set(this._hash, Object.keys(this._index)).then();

            return true;
        }

        return false;
    }
}

module.exports = Controller;