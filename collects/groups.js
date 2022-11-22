const Group = require("../controllers/values/group.js");

class Collect
{
    constructor(type, instance)
    {
        this._type = type;
        this._instance = instance;
        this._groups = {};
    }

    isset(group)
    {
        if (typeof this._groups[group] == 'undefined')
            this._groups[group] = new Group(group, this._instance);

        return this._groups[group];
    }
}

module.exports = Collect;