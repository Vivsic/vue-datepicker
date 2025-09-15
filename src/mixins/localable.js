import Vue from 'vue';

import * as locales from '../locale';
import { DEFAULT_LOCALE_PROPERTIES } from '../constants';

export default Vue.extend({
  name: 'Localable',

  props: {
    locale: { type: Object, default: () => ({ lang: undefined }) },
  },

  computed: {
    currentLocale () {
      const { lang } = this.locale;
      return { ...this.locale, lang: this.getLocale(lang) };
    },
  },
  methods: {
    getDefaultLang () {
      return 'en';
      // return (
      //   (this.$vuedatepicker && this.$vuedatepicker.lang) ||
      //   window.navigator.userLanguage ||
      //   window.navigator.language ||
      //   'en'
      // ).substr(0, 2);
    },
    isValidLocale (lang = {}) {
      const properties = Object.keys(lang);
      return properties.length > 0 &&
        properties.every(property => DEFAULT_LOCALE_PROPERTIES.includes(property));
    },
    getLocale (lang) {
      if (this.isValidLocale(lang)) {
        return lang;
      }

      if (typeof lang === 'string' && locales[lang]) {
        return locales[lang];
      }
      
      const defaultLang = this.getDefaultLang();
      if (defaultLang && locales[defaultLang]) {
        return locales[defaultLang];
      }
      
      const availableLocales = Object.keys(locales);
      if (availableLocales.length > 0) {
        return locales[availableLocales[0]];
      }
      
      return { lang: 'en' };
    },
  },
});
