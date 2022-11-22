const groups = require("../../collects/groups.js");
const Model = require("../values.js");
const grid = require("../grid.js");

class Controller extends Model
{
    constructor(type, instance)
    {
        super(type, instance);

        this._group = new groups(type, this);
        this.grid = new grid(this);
    }

    isset(group)
    {
        return this._group.isset(group);
    }
}

module.exports = Controller;