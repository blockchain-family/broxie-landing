import { makeAutoObservable, runInAction } from 'mobx';

import { GB, ID } from 'country-flag-icons/react/3x2';

import messagesEnglish from 'assets/lang/en.json';
import messagesIndonesian from 'assets/lang/id.json';
import messagesKorean from 'assets/lang/ko.json';

type Language = {
  id: string;
  text: string;
  getIcon: (className?: string) => JSX.Element;
};

const availableLanguages: Language[] = [
  {
    id: 'en',
    text: 'English',
    getIcon: (className) => <GB className={className} />,
  },
  {
    id: 'id',
    text: 'Bahasa Indonesia',
    getIcon: (className) => <ID className={className} />,
  },
  // {
  //   id: 'ko',
  //   text: '한국어',
  //   getIcon: (className) => <KR className={className} />,
  // },
];

const detectBrowserLanguage = () => {
  if (!navigator.languages || navigator.languages.length === 0) {
    return availableLanguages[0];
  }

  const userPreference = navigator.languages.find((x) =>
    availableLanguages.find((y) => x.includes(y.id.toString()))
  );

  if (!userPreference) {
    return availableLanguages[0];
  }

  return (
    availableLanguages.find((x) => userPreference.includes(x.id.toString())) ??
    availableLanguages[0]
  );
};

const langKey = 'broxie.landing.language';
const browserLanguage = detectBrowserLanguage();

const setLanguageInStore = (language: Language) => {
  localStorage.setItem(langKey, language.id);
};

const getLanguageFromStore = () => {
  const lang = localStorage.getItem(langKey);

  if (!lang) {
    setLanguageInStore(browserLanguage);

    return browserLanguage;
  }

  return availableLanguages.find((x) => x.id === lang) ?? availableLanguages[0];
};

export class LanguageStore {
  constructor() {
    makeAutoObservable(this);
  }

  initialized: boolean = false;
  language: Language = getLanguageFromStore();

  init() {
    const languageFromStore = getLanguageFromStore();
    this.setLanguage(languageFromStore);

    runInAction(() => {
      this.initialized = true;
    });
  }

  setLanguage(language: Language) {
    if (this.language.id === language.id) {
      return;
    }

    runInAction(() => {
      this.language = language;
    });

    setLanguageInStore(language);
  }

  get availableLanguages() {
    return availableLanguages;
  }

  get messages() {
    switch (this.language.id) {
      case 'en':
        return messagesEnglish;
      case 'id':
        return messagesIndonesian;
      case 'ko':
        return messagesKorean;
      default:
        return messagesEnglish;
    }
  }
}
