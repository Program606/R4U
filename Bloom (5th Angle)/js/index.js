import { translatePage } from './translation.js';

document.querySelector("select#language").addEventListener("change", async function(e){
    e.preventDefault();
    const language = this.value;
    try {
        await translatePage(language);
    } catch (error) {
        console.error('Translation failed:', error);
    }
});