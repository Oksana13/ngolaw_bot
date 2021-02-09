const { l10n } = require ('./constants');

module.exports = {
  home: [
    [{
      text: 'За что физлицо могут признать иноагентом?',
      callback_data: 'person',
    }],
    [{
      text: 'Я получаю иностранные деньги',
      callback_data: 'money',
    }],
    [{
      text: 'Я пишу на политические темы',
      callback_data: 'politic',
    }],
    [{
      text: 'Признали иностранным агентом',
      callback_data: 'agent',
    }],
    [{
      text: 'Я работаю в НКО, которую признали иностранным агентом',
      callback_data: 'ngo',
    }],
  ],
  back: [
    [{
      text: l10n.backButton,
      callback_data: 'back',
    }],
  ],
}