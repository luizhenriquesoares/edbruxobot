const CronJob = require("cron").CronJob;

module.exports = (app) => {
    let App = { }

    if (app.services) {
        App = app.services.module;
    }

    return {
        createCron: async (cronTime, timeZone) => {
  
            const cron = new CronJob({ cronTime,
                onTick: async () => {  
                    const telegramService = App.TelegramService(app);
                    await telegramService.sendMessage('vou resolver gente!')
                 },
                start: true,
                timeZone
            });
            return Promise.resolve(cron);
        }
    }
}