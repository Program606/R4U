import * as util from "../data/data.js";
import {originalTexts} from "../js/translation.js"
import {sendMail} from "../js/handleMail.js";
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
    let lastCategory = categoryCards.length-1;
    const contactCategory = categoryCards[categoryCards.length-1]
    if(contactCategory && i == lastCategory) populateContact(contactCategory);
    
    if(i != lastCategory) setUpTable(categoryCards[i], entry.data);
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
    icon.classList = `glyphicon ${category.iconName} category-icon`;
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
function populateContact(location){
    let colMd7 = document.createElement("div");
    colMd7.classList = "col-md-7 d-flex align-items-stretch";
    location.appendChild(colMd7);

    let contactWrap = document.createElement("div");
    contactWrap.classList = "contact-wrap w-100 p-md-5 p-4";
    colMd7.appendChild(contactWrap);

    let h3 = document.createElement("h3");
    h3.classList = "mb-4";
    h3.textContent = "Contact Us";
    contactWrap.appendChild(h3);

    let messageWarning = document.createElement("div");
    messageWarning.id = "form-message-warning";
    messageWarning.classList = "mb-4";
    contactWrap.appendChild(messageWarning);

    let messageSuccess = document.createElement("div");
    messageSuccess.id = "form-message-success";
    messageSuccess.classList = "mb-4";
    messageSuccess.textContent = "Your message was sent, thank you!";
    contactWrap.appendChild(messageSuccess);

    let form = document.createElement("form");
    form.method = "POST";
    form.id = "contactForm";
    form.name = "contactForm";
    contactWrap.appendChild(form);

    let row = document.createElement("div");
    row.classList = "row";
    form.appendChild(row);

    let colName = document.createElement("div");
    colName.classList = "col-md-6";
    row.appendChild(colName);

    let groupName = document.createElement("div");
    groupName.classList = "form-group";
    colName.appendChild(groupName);

    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.classList = "form-control";
    inputName.name = "name";
    inputName.id = "name";
    inputName.placeholder = "Name";
    groupName.appendChild(inputName);

    let colEmail = document.createElement("div");
    colEmail.classList = "col-md-6";
    row.appendChild(colEmail);

    let groupEmail = document.createElement("div");
    groupEmail.classList = "form-group";
    colEmail.appendChild(groupEmail);

    let inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.classList = "form-control";
    inputEmail.name = "email";
    inputEmail.id = "email";
    inputEmail.placeholder = "Email";
    groupEmail.appendChild(inputEmail);

    let colSubject = document.createElement("div");
    colSubject.classList = "col-md-12";
    row.appendChild(colSubject);

    let groupSubject = document.createElement("div");
    groupSubject.classList = "form-group";
    colSubject.appendChild(groupSubject);

    let inputSubject = document.createElement("input");
    inputSubject.type = "text";
    inputSubject.classList = "form-control";
    inputSubject.name = "subject";
    inputSubject.id = "subject";
    inputSubject.placeholder = "Subject";
    groupSubject.appendChild(inputSubject);

    let colMessage = document.createElement("div");
    colMessage.classList = "col-md-12";
    row.appendChild(colMessage);

    let groupMessage = document.createElement("div");
    groupMessage.classList = "form-group";
    colMessage.appendChild(groupMessage);

    let textarea = document.createElement("textarea");
    textarea.name = "message";
    textarea.classList = "form-control";
    textarea.id = "message";
    textarea.cols = "30";
    textarea.rows = "7";
    textarea.placeholder = "Message";
    groupMessage.appendChild(textarea);

    let colSubmit = document.createElement("div");
    colSubmit.classList = "col-md-12";
    row.appendChild(colSubmit);

    let groupSubmit = document.createElement("div");
    groupSubmit.classList = "form-group";
    colSubmit.appendChild(groupSubmit);

    let inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = "Send Message";
    inputSubmit.classList = "btn btn-primary";
    inputSubmit.onclick = sendMail;
    groupSubmit.appendChild(inputSubmit);

    let submittingDiv = document.createElement("div");
    submittingDiv.classList = "submitting";
    groupSubmit.appendChild(submittingDiv);

}
