const TelegramService = require('./telegram.service');
const CronService = require('./cron.service');

module.exports = () => {
    /**
     * @namespace app.services.module
     * @author Luiz Henrique Soares
     * **/
    return { TelegramService, CronService };
  };