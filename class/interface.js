const config = require("../config.json");

module.exports = new (require("../../node_modules/micro-service-interface-client"))('cache', config.interface.host ?? undefined, config.interface.port ?? undefined);