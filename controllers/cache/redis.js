const config = require("../../config.json");
const redis = require('../../../node_modules/redis');

class Model
{
    async init()
    {
        if (typeof config.cache.host != 'undefined') {

            if (this.initialized)
                return this.initialized;

            this.client = redis.createClient({
                url: 'redis://' +
                    (config.cache.user ?? '') +
                    ':' + config.cache.password +
                    '@' + config.cache.host +
                    ((typeof config.cache.port != 'undefined' && config.cache.port !== '') ? (':' + config.cache.port) : '')
            });

            this.client.on('error', (err) => console.log('Redis Client Error', err));

            this.initialized = await this.client.connect();

            return this.initialized;
        }

        return false;
    }

    async _get(key)
    {
        let _value = await this.client.get(key);

            try {
                _value = JSON.parse(_value);
            } catch (e){}

        return _value;
    }

    async _set(key, value)
    {
        return await this.client.set(key, (typeof value == 'object') ? JSON.stringify(value) : value);
    }

    async _delete(key)
    {
        console.log(['delete', key, await this.client.del(key)]);
        return await this.client.del(key);
    }
}

module.exports = Model;