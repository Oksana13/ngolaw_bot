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
      text: l10n.newSearch,
      callback_data: 'helpMap',
    }],
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
  backOrWebsite: [
    [{
      text: l10n.webSite,
      url: 'https://zonaprava.com/?utm_source=telegram',
    }],
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
  backAndSearch: [
    [{
      text: l10n.newSearch,
      callback_data: 'helpMap',
    }],
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
}