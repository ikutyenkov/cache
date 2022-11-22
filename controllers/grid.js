const cache = require("./cache.js");
const md5 = require("../../node_modules/md5");

class Controller
{
    constructor(instance)
    {
        this._instance = instance;
        this._path = 'grid_' + this._instance._path;
    }

    async get(key)
    {
        return await cache.get(this.getKey(key)) ?? [];
    }

    async set(hash, keys)
    {
        for (let _key of (keys ?? [])) {

            let _grid = await this.get(_key);

            if (!_grid.includes(hash)) {

                _grid.push(hash);

                if (!(await cache.set(this.getKey(_key), _grid)))
                    return false;
            }
        }

        return true;
    }

    async clear(key)
    {
        console.log(['clear', key, await this.get(key), await cache.delete(this.getKey(key))]);

        for (let _grid of (await this.get(key)))
            if (!await cache.delete(_grid))
                return false;

        return true;
    }

    getKey(key)
    {
        return md5(this._path + '_' + key);
    }
}

module.exports = Controller;