const API_KEY = "";

async function translateText(text, targetLanguage) {
  // if empty text
  if (!text) {
    console.log('Skipping empty text translation');
    return text;
  }
  
  if (targetLanguage === 'en') {
    console.log('Setting text to Default, no translation needed');
   
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

export async function translatePage(lang) {
  const elementsToTranslate = [
    // { selector: '.top-bar h2', property: 'textContent' },
    { selector: '#searchInput', property: 'placeholder' }
  ];

  const panelSelectors = [
    'Housing' ,'Clothing','Food' ,'Transport' 
  ];

  // Translate main elements
  for (const element of elementsToTranslate) {
    const el = document.querySelector(element.selector);
    if (el) {
      const originalText = element.property === 'textContent' ? el.textContent : el.placeholder;
      if (originalText && originalText.trim()) {
        const translatedText = await translateText(originalText, lang);
        if (element.property === 'textContent') {
          el.textContent = translatedText;
        } else {
          el.placeholder = translatedText;
        }
      }
    }
  }

  // Translate panel titles
  let categoryTitles = document.querySelectorAll(".categoryText");
  for (let i=0; i < categoryTitles.length; i++) {
    categoryTitles[i].textContent = await translateText(panelSelectors[i], lang);
  }
  // Translate table headers for all categories
  const tableHeaders = document.querySelectorAll('table th, table td');
  for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].textContent = await translateText(tableHeaders[i].textContent, lang);
  }
}