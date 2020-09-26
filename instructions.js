async function sendLink(id, bot, link) {
  await bot.sendMessage(id, link, {
    parse_mode: {
      parse_mode: 'HTML',
    },
  });
  // setTimeout(() => {
  //   bot.sendMessage(id, 'Вернуться в главное меню', {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [{
  //           text: 'Главное меню',
  //           callback_data: '/start',
  //         }],
  //       ],
  //     },
  //   })
  // }, 1000);
}

const LINKS = {
  SAFETY_PLAN: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsafe-plan.php&rhash=138bf2b163958c',
  PHISICAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fphysical-violence.php&rhash=138bf2b163958c',
  SEXUAL_VIOLENCE: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsexualized-violence.php&rhash=138bf2b163958c',
  RULES_SENDING_APPLICATION: 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fcorrect-application.php&rhash=138bf2b163958c',
}

// Inline buttons
// function instructionsHandler (id, bot) {
//   bot.sendMessage(id, 'Выберите инструкцию:', {
//     reply_markup: {
//       inline_keyboard: [
//         [{
//           text: 'План безопасности',
//           callback_data: 'safetyPlan',
//         }],
//         [{
//           text: 'Физическое насилие',
//           callback_data: 'phisicalViolence',
//         }],
//         [{
//           text: 'Сексуализированное насилие',
//           callback_data: 'sexualViolence',
//         }],
//         [{
//           text: 'Правила подачи заявлений',
//           callback_data: 'howTo',
//         }],
//       ],
//     },
//   });

//   bot.on('callback_query', query => {
//     const { id } = query.message.chat;

//     switch (query.data) {
//       case 'safetyPlan':
//         sendLink(id, bot, 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsafe-plan.php&rhash=138bf2b163958c');
//         break;
//       case 'phisicalViolence':
//         sendLink(id, bot, 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fphysical-violence.php&rhash=138bf2b163958c');
//         break;
//       case 'sexualViolence':
//         sendLink(id, bot, 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fsexualized-violence.php&rhash=138bf2b163958c');
//         break;
//       case 'howTo':
//         sendLink(id, bot, 'https://t.me/iv?url=https%3A%2F%2Fzp.purelines.ru%2Fdomestic-violence%2Finstructions%2Fcorrect-application.php&rhash=138bf2b163958c');
//         break;
//       default:
//         break;
//     }
//   });
// }


async function instructionsHandler (id, bot) {
  await bot.sendMessage(id, 'Выберите инструкцию:', {
    reply_markup: {
      keyboard: [
        ['План безопасности'],
        ['Что делать, если вы пострадали от физического насилия?'],
        ['Что делать, если вы пострадали от сексуализированного насилия?'],
        ['Правила подачи заявлений'],
      ],
      resize_keyboard: true,
    },
  })
}

module.exports = {
  instructionsHandler,
  sendLink,
  LINKS,
};