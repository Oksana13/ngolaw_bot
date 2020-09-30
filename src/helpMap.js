const mapJson = require('./map.json');
const { parseText, backToMainMenu } = require('./helpers');
const kb = require ('./keyboard-buttons');

const REGION_REG_EXP = /^[а-яА-ЯЁё0-9 ]+$/;

function mapResultHtml (centers) {
  return centers.map((item, index) => {
    return `
<b>${index + 1}. ${item.title}</b>
${item.contacts}
      `
  }).join('\n');
}

function showFederalCentersBtn (id, bot) {
  bot.sendMessage(id, `Просмотреть федеральные кризисные центры?`, {
    reply_markup: {
      inline_keyboard: kb.federalCenters,
    },
  });
}

module.exports = {
  async helpMapHandler(id, bot) {
    try {
      await bot.sendMessage(id, 'Укажите название или номер вашего региона');
      await bot.onText(REGION_REG_EXP, async (msg) => {
        const { text } = msg;
        const requestStringArr = text.split(' ');

        // search for requested region
        let regionCenters = text
          ? mapJson.filter((item) => {
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

          bot.sendMessage(id, `
          Результаты по региону ${text}:
          ${html}
          `, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          });
          bot.removeTextListener(REGION_REG_EXP);

          // Show button for search federal centers
          setTimeout(() => {
            showFederalCentersBtn(id, bot);
          }, 1000);
        } else {
          bot.removeTextListener(REGION_REG_EXP);
          await bot.sendMessage(id, 'К сожалению в данном регионе нет кризисных центров. Или название региона указано неверно')
          showFederalCentersBtn(id, bot);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  async showFederalCenters(id, bot) {
    const federalCenters = mapJson.filter((item) => {
      return item.regionNumber === 0;
    });

    const html = mapResultHtml(federalCenters);

    await bot.sendMessage(id, html, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
    setTimeout(() => {
      bot.sendMessage(id, 'Вернуться в главное меню?', {
        reply_markup: {
          inline_keyboard: kb.backAndSearch,
        },
      });
    }, 1000);
  },
};