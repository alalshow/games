// Imports the Google Cloud client library
//import { Translate } from '@google-cloud/translate';
const { Translate } = require('@google-cloud/translate').v2;
// Creates a client

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';
// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.

const translate = new Translate({
  projectId: 'all-prices-1583027273017', //eg my-project-0o0o0o0o'
  keyFilename: './translate/key.json', //eg my-project-0fwewexyz.json
});

const options = {
  // The target language, e.g. "ru"
  to: 'ko',
  // Make sure your project is whitelisted.
  // Possible values are "base" and "nmt"
  model: 'base',
};

const googleTranslate = async text => {
  try {
    let [translations] = await translate.translate(text, options);
    translations = Array.isArray(translations) ? translations : [translations];
    let res = '';
    translations.forEach((translation, i) => {
      res += translation ? translation : '';
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default googleTranslate;
