require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const {instructionsHandler, sendLink, LINKS} = require('./instructions');
const { helpMapHandler, showFederalCenters } = require('./helpMap');
const kb = require ('./keyboard-buttons');
const { getChatId, backToMainMenu, mainMenuHandler } = require ('./helpers');
const { analytics } = require ('./analytics');
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

const offerText =
`Юристы «Зоны права» специализируются на теме домашнего насилия и помогут вам бесплатно.

1. Проведем юридическую консультацию.
2. Подготовим процессуальные документы.
3. Представляем интересы пострадавших на этапе предварительного следствия и в суде.

Позвоните по телефону: 
+7 926 648-85-22.
Напишите письмо: 
info.zonaprava@gmail.com.`

// start bot
bot.onText(/\/start/, async msg => {
  try {
    analytics('/start', 'Главное меню');
    mainMenuHandler(getChatId(msg), bot);
  } catch (error) {
    console.error(error);
  }
})

// handle commands
bot.on('message', async msg => {
  const text = msg.text.trim();

  switch (text) {
    case '/instructions':
      instructionsHandler(getChatId(msg), bot);
      break;
    case '/helpmap':
      helpMapHandler(getChatId(msg), bot);
      break;
    case '/legalhelp':
      analytics('/legalhelp', 'Помощь юристов');
      await bot.sendMessage(getChatId(msg), offerText);
      backToMainMenu(getChatId(msg), bot);
      break;
    case l10n.INSTRUCTION_1:
      analytics('/instruction1', 'План безопасности');
      sendLink(getChatId(msg), bot, LINKS.SAFETY_PLAN);
      break;
    case l10n.INSTRUCTION_2:
      analytics('/instruction2', 'Что делать, если вы пострадали от физического насилия?');
      sendLink(getChatId(msg), bot, LINKS.PHISICAL_VIOLENCE);
      break;
    case l10n.INSTRUCTION_3:
      analytics('/instruction3', 'Что делать, если вы пострадали от сексуализированного насилия?');
      sendLink(getChatId(msg), bot, LINKS.SEXUAL_VIOLENCE);
      break;
    case l10n.INSTRUCTION_4:
      analytics('/instruction4', 'Как правильно подавать заявления и вести свое дело');
      sendLink(getChatId(msg), bot, LINKS.RULES_SENDING_APPLICATION);
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
    case 'instructions':
      instructionsHandler(userId, bot);
      break;
    case 'legalAssistance':
      analytics('/legalhelp', 'Помощь юристов');
      await bot.sendMessage(userId, offerText);
      backToMainMenu(userId, bot);
      break;
    case 'helpMap':
      helpMapHandler(userId, bot);
      break;
    case 'federalCenters':
      showFederalCenters(userId, bot);
      break;
    case 'back':
      mainMenuHandler(userId, bot);
      break;
    default:
      break;
  }
});
