const API_KEY = "";
import * as util from "../data/data.js";

// Store original English text for each element
export const originalTexts = {
  searchBtn: 'Search',
  searchInput: 'Search...',
  orgName: "Organization Name",
  description: "Description",
  linkContact: "Link/Contact",
  resource: "Resource"
};
for(let entry of util.categoryData){
  originalTexts[entry.text] = entry.text;
}
// console.log(Object.entries(originalTexts))

// Store original data arrays for translation
const originalData = {
};

for(let entry of util.categoryData){
  originalData[entry.text.replace(/[\s\/\\]+/g, '')] = entry.data;
}

console.log("Original Data "+Object.keys(originalData));

async function translateText(text, targetLanguage) {
  // if empty text
  if (!text) {
    console.log('Skipping empty text translation');
    return text;
  }
  
  if (targetLanguage === 'en') {
    console.log('Setting text to Default, no translation needed');
    return text;
  }
  
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: 'en'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error details:', errorData);
      console.error('Failed to translate text:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; 
  }
}

async function translateTableContent(lang) {
  for (const entry of util.categoryData) {
    const id = `collapse${entry.text.replace(/[\s'"\/]+/g, '')}`;
    const tableNames = document.querySelectorAll(`#${id} .tableName`);
    const tableDescriptions = document.querySelectorAll(`#${id} .tableDescription`);
    const categoryData = entry.data;

    for (let i = 0; i < tableNames.length && i < categoryData.length; i++) {
      if (tableNames[i]) {
        const originalName = categoryData[i].name;
        tableNames[i].textContent = await translateText(originalName, lang);
      }
      if (tableDescriptions[i]) {
        const originalDescription = categoryData[i].description;
        tableDescriptions[i].textContent = await translateText(originalDescription, lang);
      }
    }
  }
}

export async function translatePage(lang) {
  const elementsToTranslate = [
    { selector: '#searchBtn', property: 'textContent', originalKey: 'searchBtn' },
    { selector: '#searchInput', property: 'placeholder', originalKey: 'searchInput' }
  ];

  // Translate main elements using original English text
  for (const element of elementsToTranslate) {
    const el = document.querySelector(element.selector);
    if (el) {
      const originalText = originalTexts[element.originalKey];
      if (originalText) {
        const translatedText = await translateText(originalText, lang);
        if (element.property === 'textContent') {
          el.textContent = translatedText;
        } else {
          el.placeholder = translatedText;
        }
      }
    }
  }

  // Translate panel titles using original English text
  let categoryTitles = document.querySelectorAll(".categoryText");
  for (let i = 0; i < categoryTitles.length; i++) {
    const originalText = util.categoryData[i].text;
    categoryTitles[i].textContent = await translateText(originalText, lang);
  }

  //Translates first two columns of each table
  const headerKeys = ['orgName', 'description'];
  const allTables = document.querySelectorAll('table');
  for (const table of allTables) {
    const ths = table.querySelectorAll('th');
    for (let i = 0; i < ths.length && i < headerKeys.length; i++) {
        const originalText = originalTexts[headerKeys[i]];
        ths[i].textContent = await translateText(originalText, lang);
    }
  }

  // Translate table content using original data
  await translateTableContent(lang);
}