module.exports = (app) => {

    const { CronService } = app.services.module

    const cronService = CronService(app)

    return {
        healthCheck: async () => {
           const cronTime = '*/1 * * * *';
           const timeZone = 'America/Fortaleza';

           // create cron
           const job = await cronService.createCron(cronTime, timeZone);

           console.log('PONA!!');

            if(job) {
                job.start();
                console.log("==========================")
                console.log("CronJob Iniciado!")
                console.log(job.running); // true
                console.log("===========================")
              }
            // telegramService.sendMessage()
        }
    }
}