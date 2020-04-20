// import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import strings from './strings';

export default function init() {
   const translations = {};
   if (strings) {
      for (let i = 0; i < strings.length; i += 1) {
         const s = strings[i];
         const languageKeys = Object.keys(s).filter((x) => x !== 'key');

         for (let j = 0; j < languageKeys.length; j += 1) {
            const languageKey = languageKeys[j];
            if (!translations[languageKey]) {
               translations[languageKey] = {};
            }
            if (!translations[languageKey][s.key]) {
               translations[languageKey][s.key] = {};
            }
            translations[languageKey][s.key] = s[languageKey];
         }
      }
      i18n.translations = translations;
      //   i18n.locale = Localization.locale;
      i18n.fallbacks = true;
   }
}
