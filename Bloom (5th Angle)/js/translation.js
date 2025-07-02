const API_KEY = "";
import * as util from "../data/data.js";

// Store original English text for each element
const originalTexts = {
  searchBtn: 'Search',
  searchInput: 'Search...',
  housing: 'Housing',
  clothing: 'Clothing', 
  food: 'Food',
  transport: 'Transport',
  orgName: 'Organization Name',
  description: 'Description',
  linkContact: 'Link/Contact',
  resource: 'Resource'
};
for(let entry of util.categoryData){
  originalTexts[entry.text] = entry.text;
}
console.log("This is originalText "+originalTexts);

// Store original data arrays for translation
const originalData = {
  housing: util.housingData,
  clothing: util.clothingData,
  food: util.foodData,
  transport: util.transportData
};

for(let entry of util.categoryData){
  originalData[entry.text] = entry.data;
}
console.log("This is originalData "+ originalData);

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

// Function to translate table content using original data
async function translateTableContent(lang) {
  const categories = ['housing', 'clothing', 'food', 'transport'];
  
  for (const category of categories) {
    const tableNames = document.querySelectorAll(`#collapse${category.charAt(0).toUpperCase() + category.slice(1)} .tableName`);
    const tableDescriptions = document.querySelectorAll(`#collapse${category.charAt(0).toUpperCase() + category.slice(1)} .tableDescription`);
    
    const categoryData = originalData[category];
    
    // Translate table names and descriptions using original data
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

  const panelSelectors = [
    { text: 'Housing', originalKey: 'housing' },
    { text: 'Clothing', originalKey: 'clothing' },
    { text: 'Food', originalKey: 'food' },
    { text: 'Transport', originalKey: 'transport' }
  ];
  for(let entry of panelSelectors){
    panelSelectors.push(text, `${entry.text}`, originalKey, `${entry.text}`)
  }

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
    const originalText = originalTexts[panelSelectors[i].originalKey];
    categoryTitles[i].textContent = await translateText(originalText, lang);
  }

  // Translate table headers using original English text
  const tableHeaders = document.querySelectorAll('table th');
  const headerKeys = ['orgName', 'description', 'linkContact', 'resource'];
  
  for (let i = 0; i < tableHeaders.length; i++) {
    if (headerKeys[i]) {
      const originalText = originalTexts[headerKeys[i]];
      tableHeaders[i].textContent = await translateText(originalText, lang);
    }
  }

  // Translate table content using original data
  await translateTableContent(lang);
}