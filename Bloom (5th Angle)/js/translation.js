

async function translateText(text, targetLanguage) {
  // if empty text
  if (!text || !text.trim()) {
    console.log('Skipping empty text translation');
    return text;
  }
  
  // // Don't translate if target language is English (source language)
  // if (targetLanguage === 'en') {
  //   console.log('Skipping translation to English (source language)');
  //   return text;
  // }
  
  console.log(`Translating: "${text}" to ${targetLanguage}`);
  
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
    { selector: '#collapseHousing', text: 'HOUSING' },
    { selector: '#collapseClothing', text: 'CLOTHING' },
    { selector: '#collapseFood', text: 'FOOD' },
    { selector: '#collapseTransport', text: 'TRANSPORTATION' }
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
  for (let i = 0; i < panelSelectors.length; i++) {
    const panel = panelSelectors[i];
    const heading = document.querySelectorAll('.panel-title')[i];
    if (heading) {
      const icon = heading.querySelector('.category-icon');
      if (icon && icon.nextSibling) {
        const translatedText = await translateText(panel.text, lang);
        icon.nextSibling.textContent = ' ' + translatedText + ' ';
      }
    }
  }

  // Translate table headers for all categories
  const tableHeaders = document.querySelectorAll('table thead th');
  for (let i = 0; i < tableHeaders.length; i++) {
    const headerText = tableHeaders[i].textContent.trim();
    if (headerText) {
      const translatedText = await translateText(headerText, lang);
      tableHeaders[i].textContent = translatedText;
    }
  }
}