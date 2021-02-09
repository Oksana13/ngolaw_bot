require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const {instructionsHandler, showText, DESCRIPTIONS} = require('./instructions');
const kb = require ('./keyboard-buttons');
const { getChatId, mainMenuHandler } = require ('./helpers');
const { l10n } = require ('./constants');

const bot = new TelegramBot(process.env.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

// start bot
bot.onText(/\/start/, async msg => {
  try {
    mainMenuHandler(getChatId(msg), bot);
  } catch (error) {
    console.error(error);
  }
})

// handle commands
bot.on('message', async msg => {
  const text = msg.text.trim();

  switch (text) {
    case l10n.PERSONAL_INSTRUCTION_1:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_AGENT_WHO_IS_IT);
      break;
    case l10n.PERSONAL_INSTRUCTION_2:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_AGENT_WHI);
      break;
    case l10n.PERSONAL_INSTRUCTION_3:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_HOW_TO_PROTECT);
      break;
    case l10n.PERSONAL_INSTRUCTION_4:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_WHAT_IS_POLITICS);
      break;
    case l10n.MONEY_INSTRUCTION_1:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_GET_FOREIGN_MONEY);
      break;
    case l10n.MONEY_INSTRUCTION_2:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_IF_IT_IS_NOT_MONEY);
      break;
    case l10n.MONEY_INSTRUCTION_3:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_WORK_IN_FOREIGN_COMPANY);
      break;
    case l10n.POLITICS_INSTRUCTION_1:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_BLOG);
      break;
    case l10n.POLITICS_INSTRUCTION_2:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_OLD_MONEY);
      break;
    case l10n.AGENT_INSTRUCTION_1:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_BECAME_IA);
      break;
    case l10n.AGENT_INSTRUCTION_2:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_WORK_QUIT);
      break;
    case l10n.AGENT_INSTRUCTION_3:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_CHELANGE);
      break;
    case l10n.NGO_INSTRUCTION_1:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_WORK_IN_NGO);
      break;
    case l10n.NGO_INSTRUCTION_2:
      showText(getChatId(msg), bot, DESCRIPTIONS.PERSON_AND_NGO_IA);
      break;
    case l10n.NGO_INSTRUCTION_3:
      showText(getChatId(msg), bot, DESCRIPTIONS.NGO_AND_CEO);
      break;
    case l10n.backButton:
      bot.sendMessage(getChatId(msg), l10n.chooseSection, {
        reply_markup: {
          inline_keyboard: kb.home,
        },
      });
      break;
    default:
      break;
  }
})

// handle main menu buttons
bot.on('callback_query', async query => {
  const userId = query.from.id

  switch (query.data) {
    case 'person':
      instructionsHandler(userId, bot, 'person');
      break;
    case 'ngo':
      instructionsHandler(userId, bot, 'ngo');
      break;
    case 'money':
      instructionsHandler(userId, bot, 'money');
      break;
    case 'politic':
      instructionsHandler(userId, bot, 'politic');
      break;
    case 'agent':
      instructionsHandler(userId, bot, 'agent');
      break;
    case 'back':
      mainMenuHandler(userId, bot);
      break;
    default:
      break;
  }
});
