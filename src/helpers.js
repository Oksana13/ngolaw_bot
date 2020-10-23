const kb = require ('./keyboard-buttons');
const { l10n } = require ('./constants');

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
          inline_keyboard: kb.backOrWebsite,
        },
      });
    }, 1000);
  },

  mainMenuHandler(id, bot) {
    bot.sendMessage(id, l10n.chooseSection, {
      reply_markup: {
        inline_keyboard: kb.home,
      },
    });
  },
};
