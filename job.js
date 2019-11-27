module.exports = async app => {
  
  const { Timer } = app.common.module;
  const { NotificationController } = app.controllers.module
  
  try {    
    await Timer(3000);

    const notifierController = NotificationController(app);

    try {
      notifierController.healthCheck()

    } catch (e) {
      console.log('Erro log abaixo\n');
      console.log('==============================================\n');
      console.log(e);
    }

  } catch (e) {
    console.log(`Erro exceção capturada !`, e);
    console.log(e);
  }
};