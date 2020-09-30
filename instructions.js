module.exports = {
  async sendLink(id, bot, link) {
    await bot.sendMessage(id, link, {
      parse_mode: {
        parse_mode: 'HTML',
      },
    });
  },

  LINKS: {
    SAFETY_PLAN: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsafe-plan.php&rhash=138bf2b163958c',
    PHISICAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fphysical-violence.php&rhash=138bf2b163958c',
    SEXUAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsexualized-violence.php&rhash=138bf2b163958c',
    RULES_SENDING_APPLICATION: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fcorrect-application.php&rhash=138bf2b163958c',
  },

  async instructionsHandler (id, bot) {
    await bot.sendMessage(id, 'Выберите инструкцию:', {
      reply_markup: {
        keyboard: [
          ['План безопасности'],
          ['Что делать, если вы пострадали от физического насилия?'],
          ['Что делать, если вы пострадали от сексуализированного насилия?'],
          ['Правила подачи заявлений'],
          ['Назад'],
        ],
        resize_keyboard: true,
      },
    });
  },
};
