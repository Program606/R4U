
const housingData = [
  {
    name: "Open Health Alliance",
    description: "Non-profit focused on global public health education.",
    contact: "info@openhealth.org",
    resource: "https://openhealth.org/resources"
  },
  {
    name: "EduTech Connect",
    description: "Bridges educational technology with underfunded schools.",
    contact: "contact@edutech.org",
    resource: "https://edutech.org/toolkit"
  },
  {
    name: "Green Future Initiative",
    description: "Environmental awareness and youth-led sustainability projects.",
    contact: "hello@greenfuture.io",
    resource: "https://greenfuture.io/resources"
  },
  {
    name: "MindCare Network",
    description: "Offers mental health services and training programs.",
    contact: "support@mindcare.net",
    resource: "https://mindcare.net/resources"
  }
];

const clothingData = [
  {
    name: "Open Health Alliance",
    description: "Non-profit focused on global public health education.",
    contact: "info@openhealth.org",
    resource: "https://openhealth.org/resources"
  },
  {
    name: "EduTech Connect",
    description: "Bridges educational technology with underfunded schools.",
    contact: "contact@edutech.org",
    resource: "https://edutech.org/toolkit"
  },
  {
    name: "Green Future Initiative",
    description: "Environmental awareness and youth-led sustainability projects.",
    contact: "hello@greenfuture.io",
    resource: "https://greenfuture.io/resources"
  },
  {
    name: "MindCare Network",
    description: "Offers mental health services and training programs.",
    contact: "support@mindcare.net",
    resource: "https://mindcare.net/resources"
  },
  {
    name: "Global Literacy Project",
    description: "Promotes literacy through book donations and volunteer teaching.",
    contact: "books@globallit.org",
    resource: "https://globallit.org/downloads"
  },
  {
    name: "Women in Tech Forum",
    description: "Empowers women in STEM through mentorship and workshops.",
    contact: "admin@witforum.com",
    resource: "https://witforum.com/resources"
  },
  {
    name: "SafeNet Youth",
    description: "Provides internet safety training for children and parents.",
    contact: "info@safenet.org",
    resource: "https://safenet.org/guide"
  },
  {
    name: "Tech for Good Foundation",
    description: "Connects tech solutions with non-profits and social causes.",
    contact: "hello@tech4good.org",
    resource: "https://tech4good.org/resources"
  },
  {
    name: "Access4All Initiative",
    description: "Improves digital access in marginalized communities.",
    contact: "info@access4all.net",
    resource: "https://access4all.net/resources"
  },
  {
    name: "Youth Voices Network",
    description: "Amplifies youth advocacy through storytelling and media.",
    contact: "voices@yvn.org",
    resource: "https://yvn.org/resources"
  }
];

const foodData = [
  {
    name: "Open Health Alliance",
    description: "Non-profit focused on global public health education.",
    contact: "info@openhealth.org",
    resource: "https://openhealth.org/resources"
  },
  {
    name: "EduTech Connect",
    description: "Bridges educational technology with underfunded schools.",
    contact: "contact@edutech.org",
    resource: "https://edutech.org/toolkit"
  },
  {
    name: "Green Future Initiative",
    description: "Environmental awareness and youth-led sustainability projects.",
    contact: "hello@greenfuture.io",
    resource: "https://greenfuture.io/resources"
  },
  {
    name: "MindCare Network",
    description: "Offers mental health services and training programs.",
    contact: "support@mindcare.net",
    resource: "https://mindcare.net/resources"
  }
];

const transportationData = [
  {
    name: "Open Health Alliance",
    description: "Non-profit focused on global public health education.",
    contact: "info@openhealth.org",
    resource: "https://openhealth.org/resources"
  },
  {
    name: "EduTech Connect",
    description: "Bridges educational technology with underfunded schools.",
    contact: "contact@edutech.org",
    resource: "https://edutech.org/toolkit"
  },
  {
    name: "Green Future Initiative",
    description: "Environmental awareness and youth-led sustainability projects.",
    contact: "hello@greenfuture.io",
    resource: "https://greenfuture.io/resources"
  },
  {
    name: "MindCare Network",
    description: "Offers mental health services and training programs.",
    contact: "support@mindcare.net",
    resource: "https://mindcare.net/resources"
  }
];

const tableColumns = 
  [ "Organization Name",
    "Description",
    "Link/Contact",
    "Resource"
]

populate();

function displayOrganizationalData(value){
    console.log(`${value.name} - ${value.contact}`);
}

function populate(){
  let housing = document.querySelector("#collapseHousing div.panel-body");
  let clothing = document.querySelector("#collapseClothing div.panel-body");
  let food = document.querySelector("#collapseFood div.panel-body");
  let transportation = document.querySelector("#collapseTransport div.panel-body");

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
  let tableRow =document.createElement("tr");

  let tableName = document.createElement("td");
  let tableDescription = document.createElement("td");
  let tableContact = document.createElement("td");
  let tableResource = document.createElement("td");

    tableRow.appendChild(tableName);
    tableRow.appendChild(tableDescription);
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