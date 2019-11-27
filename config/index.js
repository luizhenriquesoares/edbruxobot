const config = require('config');

module.exports = (app) => {

    return {
        getConfig: async () => {
            const dbConfig = config.get('group.access');
            return Promise.resolve(dbConfig);   
        }
    }
}