module.exports = () => {
    /** @namespace app.common.timer */
    class Timer {
      static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
    return { Timer };
  };