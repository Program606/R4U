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

$('.panel-collapse').on('shown.bs.collapse', function () {
    $(this).prev('.panel-heading').find('.toggle-icon')
      .removeClass('glyphicon-plus')
      .addClass('glyphicon-minus');
  });

  $('.panel-collapse').on('hidden.bs.collapse', function () {
    $(this).prev('.panel-heading').find('.toggle-icon')
      .removeClass('glyphicon-minus')
      .addClass('glyphicon-plus');
  });

document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();

    document.querySelectorAll('.panel-collapse').forEach(panel => {
        const bodyText = panel.querySelector('.panel-body').textContent.toLowerCase();
        if (bodyText.includes(query)) {
            $(panel).collapse('show');
        } else {
            $(panel).collapse('hide');
        }
    });
});