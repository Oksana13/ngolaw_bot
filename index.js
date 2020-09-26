require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const {instructionsHandler, sendLink, LINKS} = require('./instructions.js');
const helpMapHandler = require('./helpMap.js');

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

// handle commands

bot.on('message', async msg => {
  const { id } = msg.chat
  const text = msg.text.trim();

  switch (text) {
    case '/start':
      await bot.sendMessage(id, botDescription)
      await bot.sendMessage(id, 'Выберите нужный раздел.', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Инструкции',
              callback_data: 'instructions',
            }],
            [{
              text: 'Помощь юристов',
              callback_data: 'legalAssistance',
            }],
            [{
              text: 'Карта помощи',
              callback_data: 'helpMap',
            }],
          ],
        },
      });
      break;
    case '/instructions':
      instructionsHandler(id, bot);
      break;
    case '/helpmap':
      helpMapHandler(id, bot);
      break;
    case '/legalhelp':
      bot.sendMessage(id, offerText);
      break;
    case 'План безопасности':
      sendLink(id, bot, LINKS.SAFETY_PLAN);
      break;
    case 'Что делать, если вы пострадали от физического насилия?':
      sendLink(id, bot, LINKS.PHISICAL_VIOLENCE);
      break;
    case 'Что делать, если вы пострадали от сексуализированного насилия?':
      sendLink(id, bot, LINKS.SEXUAL_VIOLENCE);
      break;
    case 'Правила подачи заявлений':
      sendLink(id, bot, LINKS.RULES_SENDING_APPLICATION);
      break;
    default:
      break;
  }
})

// handle main menu buttons

bot.on('callback_query', query => {
  const { id } = query.message.chat;

  switch (query.data) {
    case 'instructions':
      instructionsHandler(id, bot);
      break;
    case 'legalAssistance':
      bot.sendMessage(id, offerText);
      break;
    case 'helpMap':
      helpMapHandler(id, bot);
      break;
    default:
      break;
  }
});
