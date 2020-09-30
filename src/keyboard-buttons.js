const { l10n } = require ('./constants');

module.exports = {
  home: [
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
  federalCenters: [
    [{
      text: 'Смотреть',
      callback_data: 'federalCenters',
    }],
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
  back: [
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
}