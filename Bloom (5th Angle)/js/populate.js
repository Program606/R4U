import * as util from "../data/data.js";
import {originalTexts} from "../js/translation.js"

const tableColumns = [
  originalTexts["orgName"],
  originalTexts["description"],
  originalTexts["linkContact"],
  originalTexts["resource"]
]

populate();

function populate(){

  populateCategories();
  let languageForm = document.querySelector("div.top-bar");
  populateLangOptions(languageForm);

  let categoryCards = document.querySelectorAll("div.panel-body");

  for(let i=0;i < categoryCards.length; i++){
    let entry = util.categoryData[i];
    if (!entry) {
      console.warn(`No data for category index ${i+1}`);
      continue;
    }
    setUpTable(categoryCards[i], entry.data);
  }
}
function populateCategories(){
  let location = document.querySelector("div.search-bar-group").nextElementSibling;

  for(let category of util.categoryData){
    let panelDefault = document.createElement("div");
    panelDefault.classList = "panel panel-default";
    location.appendChild(panelDefault);


    let panelHeading = document.createElement("div");
    panelHeading.classList.add("panel-heading");
    panelHeading.setAttribute("data-toggle", "collapse");
    panelHeading.setAttribute("href", `#collapse${(category.text).replace(/[\s'"\/]+/g, '')}`);

    panelDefault.appendChild(panelHeading);
    let h4 = document.createElement("h4");
    h4.classList.add("panel-title");
    panelHeading.appendChild(h4)

    let icon = document.createElement("span");
    icon.classList = "glyphicon glyphicon-shopping-cart category-icon";
    let categoryText = document.createElement("span");
    categoryText.classList.add("categoryText");
    categoryText.textContent = (category.text).toUpperCase();
    let plusIcon = document.createElement("span");
    plusIcon.classList = "pull-right toggle-icon glyphicon glyphicon-plus";

    h4.appendChild(icon);
    h4.appendChild(categoryText);
    h4.appendChild(plusIcon);

    let collapse = document.createElement("div");
    collapse.setAttribute("id", `collapse${(category.text.replace(/[\s\/\\]+/g, ''))}`);
    collapse.classList = "panel-collapse collapse";
    panelDefault.appendChild(collapse);

    let panelBody = document.createElement("div");
    panelBody.classList.add("panel-body");
    collapse.appendChild(panelBody);
  }
}
function setUpTable(locator, data){
  
  const table = document.createElement("table"); 
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  locator.appendChild(table);
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  createTableHeader(tableHead);

  for (let entry of data) {
    createTableRows(entry, tableBody);
  }
}
function createTableRows(value, tableBody){
  let tableRow = document.createElement("tr");

  let tableName = document.createElement("td");
  let tableDescription = document.createElement("td");
  let tableContact = document.createElement("td");
  let tableResource = document.createElement("td");

    tableRow.appendChild(tableName);
    tableName.classList.add("tableName");
    tableRow.appendChild(tableDescription);
    tableDescription.classList.add("tableDescription");
    tableRow.appendChild(tableContact);
    tableRow.appendChild(tableResource);
    
    tableBody.appendChild(tableRow);

    tableName.textContent = value.name;
    tableDescription.textContent = value.description;
    tableContact.textContent = value.contact;
    tableResource.textContent = value.resource;
}
function createTableHeader(tableHead){
    const headerRow = document.createElement("tr");

  tableColumns.forEach(tableColumn => {
    let th = document.createElement("th");
    th.textContent = tableColumn;
    headerRow.appendChild(th);
    tableHead.appendChild(headerRow);
  });
};
function populateLangOptions(htmlLocation) {
  const form = document.createElement("form");
  htmlLocation.appendChild(form);
  form.setAttribute("action", "./index.html");  
  form.setAttribute("method", "get");
  form.setAttribute("id", "languageForm");

  const label = document.createElement("label");
  label.setAttribute("for", "language");  
  label.textContent = "Choose Language:";
  form.appendChild(label);

  const select = document.createElement("select");
  select.setAttribute("id", "language");
  select.setAttribute("name", "language");
  select.classList.add("form-control");
  form.appendChild(select);

  for (const lang of util.languageData) {
    const option = document.createElement("option");
    option.setAttribute("value", lang.langCode);
    option.textContent = lang.language;
    select.appendChild(option);

    if(lang.langCode === "en") {
      option.selected = true; // Set English as the default selected language
    }
  }
  form.appendChild(select);
}