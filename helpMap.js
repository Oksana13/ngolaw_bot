const mapJson = require('./map.json');
const { parseText } = require('./helpers');

function mapResultHtml (centers) {
  return centers.map((item, index) => {
    return `
<b>${index + 1}. ${item.title}</b>
${item.contacts}
      `
  }).join('\n');
}

function showFederalCenters (id, bot) {
  bot.sendMessage(id, `Просмотреть федеральные кризисные центры?`, {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Смотреть',
          callback_data: 'federalCenters',
        }],
      ],
    },
  });
}

async function helpMapHandler(id, bot) {
  await bot.sendMessage(id, 'Укажите название или номер вашего региона');
  await bot.onText(/^[а-яА-ЯЁё0-9 ]+$/, async (msg) => {
    const { text } = msg;
    const requestStringArr = text.split(' ');

    // search for requested region
    let regionCenters = text
      ? await mapJson.filter((item) => {
        return Number(item.regionNumber) === Number(text)
        || (item.regionName && parseText(item.regionName) === parseText(text))
        || (item.regionNameSecondary && parseText(item.regionNameSecondary) === parseText(text))
        || requestStringArr.find((requestedVal => {
          return Number(item.regionNumber) === Number(requestedVal)
            || (item.regionName && parseText(item.regionName) === parseText(requestedVal))
            || (item.regionNameSecondary && parseText(item.regionNameSecondary) === parseText(requestedVal))
        }))
      }) : [];

    // if we have data for requested region map the data and send to user
    if (regionCenters.length) {
      const html = mapResultHtml(regionCenters);

      await bot.sendMessage(id, `
        Результаты по региону ${text}:
        ${html}
        `, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });

      // Show button for search federal centers
      setTimeout(() => {
        showFederalCenters(id, bot);
      }, 1000);
    } else {
      await bot.sendMessage(id, 'К сожалению в данном регионе нет кризисных центров. Или название региона указано неверно')
      showFederalCenters(id, bot);
    }
  });

  bot.on('callback_query', async query => {
    const { id } = query.message.chat;

    if (query.data === 'federalCenters') {
      const federalCenters = await mapJson.filter((item) => {
        return item.regionNumber === 0;
      });

      const html = mapResultHtml(federalCenters);

      bot.sendMessage(id, html, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });
    }
  });
}

module.exports = helpMapHandler;