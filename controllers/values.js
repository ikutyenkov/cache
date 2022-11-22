const md5 = require("../../node_modules/md5");

class Controller
{
    constructor(index, instance)
    {
        this._index =  index;
        this._instance = instance;
        this._path = (typeof this._instance != 'undefined' ? this._instance.getPath() + '_' : '') + (typeof this._index == 'object' ? JSON.stringify(this._index) : this._index);
        this._hash = md5(this._path);
    }

    getPath()
    {
        return this._path;
    }
}

module.exports = Controller;