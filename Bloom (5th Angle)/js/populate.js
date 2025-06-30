import { housingData, clothingData, foodData, transportationData, languageData } from "../data/data.js";

const tableColumns = 
  [ "Organization Name",
    "Description",
    "Link/Contact",
    "Resource"
]

populate();

function populate(){

  let housing = document.querySelector("#collapseHousing div.panel-body");
  let clothing = document.querySelector("#collapseClothing div.panel-body");
  let food = document.querySelector("#collapseFood div.panel-body");
  let transportation = document.querySelector("#collapseTransport div.panel-body");
  let languageForm = document.querySelector("div.top-bar");

  populateLangOptions(languageForm);
  setUpTable(housing, housingData);
  setUpTable(clothing, clothingData);
  setUpTable(food, foodData);
  setUpTable(transportation, transportationData);
}
function setUpTable(category, data){
  
  const table = document.createElement("table"); 
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  category.appendChild(table);
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  createTableHeader(tableHead);

  for (const [key, value] of Object.entries(data)) {
    createTableRows(value, tableBody);
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

  for (const lang of languageData) {
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