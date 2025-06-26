import { translate } from '@vitalets/google-translate-api';

const { text } = await translate('Mabaho Kayo', { to: 'en' });

console.log(text) // => 'Hello World! How are you?'