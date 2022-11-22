const Instance = require("../controllers/values/instance.js");

class Collect
{
   constructor()
   {
       this.instances = {};
   }

    getInstance(instance)
    {
        if (typeof this.instances[instance] == 'undefined')
            this.instances[instance] = new Instance(instance);

        return this.instances[instance];
    }
}

module.exports = new Collect();