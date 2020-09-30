const kb = require ('./keyboard-buttons.js');

module.exports = {
  debug(obj = {}) {
    return JSON.stringify(obj, null, 4);
  },

  parseText(text) {
    return text.trim().toLowerCase();
  },

  getChatId(message) {
    return message.chat.id
  },

  backToMainMenu(id, bot) {
    setTimeout(() => {
      bot.sendMessage(id, 'Вернуться в главное меню?', {
        reply_markup: {
          inline_keyboard: kb.back,
        },
      });
    }, 1000);
  },
};
