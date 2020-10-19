const { l10n } = require ('./constants');

module.exports = {
  async sendLink(id, bot, link) {
    await bot.sendMessage(id, link, {
      parse_mode: {
        parse_mode: 'HTML',
      },
    });
  },

  LINKS: {
    SAFETY_PLAN: 'https://t.me/iv?url=https%3A%2F%2Fzonaprava.com%2Fdomestic-violence%2Finstructions%2Fsafe-plan.php&rhash=f69d5c9b0927d4',
    PHISICAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzonaprava.com%2Fdomestic-violence%2Finstructions%2Fphysical-violence.php&rhash=f69d5c9b0927d4',
    SEXUAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzonaprava.com%2Fdomestic-violence%2Finstructions%2Fsexualized-violence.php&rhash=f69d5c9b0927d4',
    RULES_SENDING_APPLICATION: 'https://t.me/iv?url=https%3A%2F%2Fzonaprava.com%2Fdomestic-violence%2Finstructions%2Fcorrect-application.php&rhash=f69d5c9b0927d4',
  },

  async instructionsHandler (id, bot) {
    await bot.sendMessage(id, 'Выберите инструкцию:', {
      reply_markup: {
        keyboard: [
          [l10n.INSTRUCTION_1],
          [l10n.INSTRUCTION_2],
          [l10n.INSTRUCTION_3],
          [l10n.INSTRUCTION_4],
          [l10n.backButton],
        ],
        resize_keyboard: true,
      },
    });
  },
};
