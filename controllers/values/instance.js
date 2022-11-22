const types = require("../../collects/types.js");
const Model = require("../values.js");

class Controller extends Model
{
   constructor(instance)
   {
       super(instance);

       this._types = new types(this);
   }

   isset(type)
   {
       return this._types.isset(type);
   }
}

module.exports = Controller;