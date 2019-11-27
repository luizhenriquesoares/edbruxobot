const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

module.exports = (app) => {

    const createBot = async () => {
        const configService = app.config.index;

        const env = await configService.getConfig();
        try {
            const bot = new TelegramBot(env.token, {polling: true});
            return Promise.resolve([bot, env]);
        } catch (error) {
            throw error;
        };
    }

    const AuthFeeder = async () => {
        const configService = app.config.index;
        const env = await configService.getConfig();

        const URI = `https://${env.WEBFEEDER_URL}`
        .concat(`${env.WEBFEEDER_LOGIN_PATH}`)
        .concat(`?login=${env.WEBFEEDER_LOGIN}`)
        .concat(`&password=${env.WEBFEEDER_PASSWORD}`)

        try {
            const response = await axios.post(`${URI}`);
            const token = response.headers['set-cookie']
            if (!token && Array.isArray(token)) throw 'Error ao gerar o token!';
            
            for (const item of token) {
            if (item.includes('JSESSIONID')) {
                return `${item} domain=.${process.env.WEBFEEDER_URL}; Expires=${response.headers.date}`;
            }
            }
            throw 'Não existe JESSIONID';

        } catch (error) {
            throw error
        }
    }

    const checkCustody = async (clientId) => {
        const configService = app.config.index;
        const env = await configService.getConfig();

        const token = await AuthFeeder();
        
        const { data } = await axios.request({
            method: 'GET',
            url: `https://${env.WEBFEEDER_URL}${env.WEBFEEDER_TESOURODIRETO_LISTA_CLIENTE}${clientId}`, headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'cache-control': 'no-cache', 
                Cookie: token 
            } 
        });
        return data;
    }
          
    return {
        sendMessage: async () => {
            const [bot, env] = await createBot();

            const clientId = '1996';
            const data = await checkCustody(clientId);
            
            if (data.listBeans && data.listBeans.length > 0) {
                return new Promise((resolve, reject) => {
                    resolve(bot.sendMessage(env.liveloGroup, "OMS Está Ok gente!!"));
                });
            } else {
                return new Promise((resolve, reject) => {
                    resolve(bot.sendMessage(env.liveloGroup, "OMS fora gente, vou resolver!!"));
                });
            }
        }
    }
}