const config = require("../config.json");
const Model = require("./cache/" + config.cache.controller + ".js");

class Controller extends Model
{
    async get(key)
    {
        if (this.init())
            return await this._get(key);

        return false;
    }

    async set(key, value)
    {
        if (this.init())
            return await this._set(key, value);

        return false;
    }

    async delete(key)
    {
        if (this.init())
            return await this._delete(key);

        return false;
    }
}

module.exports = new Controller();