/*
Declaring and Initializing Variables  
*/

//Counters/Trackers
let clicked = null;
let rows = 12;
let cols = 7;

//DOM elements
//Main elements
const wrapper = document.getElementById("wrapper");
const gridContainer = document.getElementById("grid-container");

const contentTiles = document.getElementsByClassName("content");

//Modals
const newEventModal = document.getElementById("save-event-modal");
const deleteEventModal = document.getElementById("delete-event-modal");
const optionsModal = document.getElementById("options-modal");
const backDrop = document.getElementById("modal-backdrop");

//Buttons and Inputs
const eventSelector = document.getElementById("event-selector");
const eventLabelInput = document.getElementById("event-label-input");
const eventTypeSelector = document.getElementById("event-type-selector");
const occurrenceTypeSelector = document.getElementById(
  "occurrence-type-selector"
);
const saveHTMLButton = document.getElementById("save-HTML-button");
const copyButton = document.getElementById("copy-HTML-button");
const cancelButton1 = document.getElementById("cancel-button-1");
const cancelButton2 = document.getElementById("cancel-button-2");
const closeButton = document.getElementById("close-button");
const newEventModalButton = document.getElementById("new-event-modal-button");
const deleteEventModalButton = document.getElementById(
  "delete-event-modal-button"
);
const saveButton = document.getElementById("save-button");
const deleteButton = document.getElementById("delete-button");
const deleteAllButton = document.getElementById("delete-all-button");

//Image Links
/*
const symbolSources = {
  lecture: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/classroom.png",
  lab: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  tutorial: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/76944400/magnifyingGlass.png",
  "office-hours": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  "assessment-due": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  "project-due": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  quiz: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  midterm: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  "final-exam": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
  other: "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/729440282/gear.png",
};*/


const symbolSources = {
  lecture: "imgs/classroom.png",
  lab: "imgs/gear.png",
  tutorial: "imgs/magnifyingGlass.png",
  "office-hours": "imgs/gear.png",
  "assessment-due": "imgs/gear.png",
  "project-due": "imgs/gear.png",
  quiz: "imgs/gear.png",
  midterm: "imgs/gear.png",
  "final-exam": "imgs/gear.png",
  other: "imgs/gear.png",
};


/*
End of Declaring and Initializing Variables  
*/

/*
Event Listeners
*/

backDrop.addEventListener("click", closeModal);
saveHTMLButton.addEventListener("click", getHTMLtext);
copyButton.addEventListener("click", copyToClipboard);
cancelButton1.addEventListener("click", closeModal);
cancelButton2.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
saveButton.addEventListener("click", saveEvent);
deleteAllButton.addEventListener("click", deleteAllEvents);
deleteButton.addEventListener("click", deleteEvent);
eventTypeSelector.addEventListener("change", showLabelInput);

/*
End of Event Listeners
*/

/*
Functions
*/

function createGrid(rows, cols) {
  //tracks tile number for content tiles (global variable)
  contentTileNum = 1;

  //Creates day tiles
  for (let i = 0; i < cols; i++) {
    const dayTile = document.createElement("div");
    dayTile.setAttribute("class", "grid-item day");
    dayTile.innerHTML = `Day ${i + 1}`;
    gridContainer.appendChild(dayTile);
  }

  //Creates week and content tiles
  for (let j = 0; j <= rows - 1; j++) {
    const weekTile = document.createElement("div");
    const weekText = document.createElement("div");
    weekTile.setAttribute("class", "grid-item week");
    weekText.setAttribute("class", "week-text");
    weekText.innerHTML = `Week ${j + 1}`;
    weekTile.appendChild(weekText);
    gridContainer.appendChild(weekTile);

    for (let h = 0; h < cols; h++) {
      const contentTile = document.createElement("div");
      contentTile.setAttribute("class", "grid-item content");
      contentTile.setAttribute("id", `content-tile-${contentTileNum}`);
      gridContainer.appendChild(contentTile);
      contentTileNum++;
    }
  }
}

function initClickTiles() {
  for (let i = 0; i < contentTiles.length; i++) {
    contentTiles[i].addEventListener("click", function () {
      openModal(contentTiles[i]);
    });
  }
}

function openNewEventModal() {
  optionsModal.style.display = "none";
  newEventModal.style.display = "block";
}

function openDeleteEventModal() {
  for (let i = 0; i < clicked.children.length; i++) {
    const newEventOption = document.createElement("option");
    newEventOption.setAttribute("value", `${i}`);
    newEventOption.innerHTML = clicked.children[i].innerHTML;
    eventSelector.appendChild(newEventOption);
  }
  optionsModal.style.display = "none";
  deleteEventModal.style.display = "block";
}

function openModal(targetTile) {
  clicked = targetTile;

  eventSelector.innerHTML = "";

  if (clicked.innerHTML == "") {
    newEventModal.style.display = "block";
  } else {
    optionsModal.style.display = "block";
  }

  newEventModalButton.addEventListener("click", openNewEventModal);

  deleteEventModalButton.addEventListener("click", openDeleteEventModal);

  backDrop.style.display = "block";

  console.log(clicked.id);
}

function closeModal() {
  optionsModal.style.display = "none";
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  clicked = null;
}

function showLabelInput() {
  let eventTypeValue = eventTypeSelector.value;
  let textBoxInput = document.getElementById("text-box-input");
  textBoxInput.value = "";

  if (eventTypeValue === "other") {
    eventLabelInput.style.display = "block";
  } else {
    eventLabelInput.style.display = "none";
  }
}

function saveEvent() {
  let eventTypeValue = eventTypeSelector.value;
  let eventTypeTitle = eventTypeValue.replace("-", " ");
  let occurrenceTypeValue = occurrenceTypeSelector.value;
  let userInput = document.getElementById("text-box-input");
  let clickedTileNum = parseInt(clicked.id.split("-")[2]);

  if (occurrenceTypeValue == "repeat") {
    for (let i = clickedTileNum; i <= rows * cols; i++) {
      if (i % 7 == clickedTileNum % 7) {
        const newEvent = document.createElement("div");
        const newEventContent = document.createElement("div");
        const newEventSymbolWrapper = document.createElement("div");
        const newSymbol = document.createElement("img");
        newEvent.setAttribute("class", `event ${eventTypeValue}`);
        newEventContent.setAttribute(
          "class",
          `event-content ${eventTypeValue}`
        );
        newEventSymbolWrapper.setAttribute(
          "class",
          `symbol-wrapper ${eventTypeValue}-symbol ${eventTypeValue}`
        );
        newSymbol.setAttribute("src", symbolSources[eventTypeValue]);
        newSymbol.setAttribute("alt", symbolSources[eventTypeValue]);
        newSymbol.setAttribute("class", "symbol");

        newEvent.appendChild(newEventSymbolWrapper);
        newEvent.appendChild(newEventContent);
        newEventSymbolWrapper.appendChild(newSymbol);
        
        if(eventTypeValue == "other"){
          newEventContent.innerHTML = userInput.value;
        }else{
          newEventContent.innerHTML = eventTypeTitle;
        }

        document.getElementById(`content-tile-${i}`).appendChild(newEvent);
      }
    }
  } else {
    const newEvent = document.createElement("div");
    const newEventContent = document.createElement("div");
    const newEventSymbolWrapper = document.createElement("div");
    const newSymbol = document.createElement("img");
    newEvent.setAttribute("class", `event ${eventTypeValue}`);
    newEventContent.setAttribute("class", `event-content ${eventTypeValue}`);
    newEventSymbolWrapper.setAttribute(
      "class",
      `symbol-wrapper ${eventTypeValue}-symbol ${eventTypeValue}`
    );
    newSymbol.setAttribute("src", symbolSources[eventTypeValue]);
    newSymbol.setAttribute("alt", symbolSources[eventTypeValue]);
    newSymbol.setAttribute("class", "symbol");

    newEvent.appendChild(newEventSymbolWrapper);
    newEvent.appendChild(newEventContent);
    newEventSymbolWrapper.appendChild(newSymbol);
    
    if(eventTypeValue == "other"){
      newEventContent.innerHTML = userInput.value;
    }else{
      newEventContent.innerHTML = eventTypeTitle;
    }
    
    clicked.appendChild(newEvent);
  }

  closeModal();
}

function deleteEvent() {
  let eventValue = eventSelector.value;

  let selectedEvent = clicked.children[eventValue];

  selectedEvent.remove();

  closeModal();
}

function deleteAllEvents() {
  clicked.innerHTML = "";
  closeModal();
}


function getHTMLtext() {
  let htmlText = document.getElementById("wrapper").outerHTML;
  let textArea = document.getElementById("text-area");

  textArea.value = htmlText;
}

function copyToClipboard() {
  document.getElementById("text-area").select();
  document.execCommand("copy");
}

/*
End of Functions
*/



/*
Function Execution
*/
createGrid(rows, cols);
initClickTiles();
/*
End of Function Execution
*/
