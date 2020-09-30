require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const {instructionsHandler, sendLink, LINKS} = require('./instructions.js');
const { helpMapHandler, showFederalCenters } = require('./helpMap.js');
const kb = require ('./keyboard-buttons.js');
const { getChatId, backToMainMenu } = require ('./helpers.js');

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

const botDescription = `Привет! Это бот правозащитной  организации «Зона права». Мы  защищаем права людей в тюрьмах, армии и медучреждениях. Также мы помогаем людям, пострадавшим от домашнего насилия. 

С помощью этого бота вы можете: 
1. Получить план действий в случае домашнего насилия,
2. узнать адреса центров помощи в своем регионе,
3. обратиться за юридической помощью.`

// start bot
bot.onText(/\/start/, async msg => {
  try {
    await bot.sendMessage(getChatId(msg), botDescription)
    bot.sendMessage(getChatId(msg), 'Выберите нужный раздел.', {
      reply_markup: {
        inline_keyboard: kb.home,
      },
    });
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
      await bot.sendMessage(getChatId(msg), offerText);
      backToMainMenu(getChatId(msg), bot);
      break;
    case 'План безопасности':
      sendLink(getChatId(msg), bot, LINKS.SAFETY_PLAN);
      break;
    case 'Что делать, если вы пострадали от физического насилия?':
      sendLink(getChatId(msg), bot, LINKS.PHISICAL_VIOLENCE);
      break;
    case 'Что делать, если вы пострадали от сексуализированного насилия?':
      sendLink(getChatId(msg), bot, LINKS.SEXUAL_VIOLENCE);
      break;
    case 'Правила подачи заявлений':
      sendLink(getChatId(msg), bot, LINKS.RULES_SENDING_APPLICATION);
      break;
    case 'Назад':
      bot.sendMessage(getChatId(msg), 'Выберите раздел:', {
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
      bot.sendMessage(userId, 'Выберите нужный раздел.', {
        reply_markup: {
          inline_keyboard: kb.home,
        },
      });
      break;
    default:
      break;
  }
});
