import { makeNote } from "./dom.js";
import { showPrompt } from "./modal.js";
import Category from "./category.js";

const category = ["Task", "Random Thought", "Idea"];

let showArchived = false;
const dataCaption = ["Name", "Created", "Category", "Content", "Dates"];
const data = [
  {
    name: "Shopping list",
    created: "2021.06.11",
    category: "Task",
    content: "Tomatoes, bread",
    dates: [],
    _id: 1,
    _archived: false,
  },
  {
    name: "The theory of evolution",
    created: "2021.06.11",
    category: "Random Thought",
    content: "The evolution...",
    dates: [],
    _id: 2,
    _archived: false,
  },
  {
    name: "New Feature",
    created: "2021.06.11",
    category: "Idea",
    content: "Implement new ...",
    dates: [],
    _id: 3,
    _archived: false,
  },
];

const categories = new Category(category);
const elCategories = categories.getHTMLElement();
document.getElementById("category-place").appendChild(elCategories);

const list = [];

function makeNoteListCaption() {
  const caption = document.createElement("div");
  caption.classList.add("note-caption");

  dataCaption.forEach((el) => {
    const col = document.createElement("div");
    col.classList.add("col-caption");
    col.innerText = el;
    caption.appendChild(col);
  });

  return caption;
}

function showList() {
  const root = document.getElementById("root");
  list.length = 0;
  root.innerHTML = "";

  root.appendChild(makeNoteListCaption());

  data
    .filter((note) => !note._archived || showArchived)
    .forEach((note) => {
      list.push(makeNote(note, removeNote, editNote, archiveNote));
    });

  list.forEach((note) => {
    root.appendChild(note);
  });

  showCategorySummary();
}

function showCategorySummary() {
  const elCategorySummary = document.getElementById("category-summary");
  elCategorySummary.innerText = "";
  elCategorySummary.appendChild(categories.getCategoryTable(data));
}

function removeNote(id) {
  const idx = data.findIndex((el) => el._id === id);
  data.splice(idx, 1);
  showList();
}

function editNote(id) {
  const idx = data.findIndex((el) => el._id === id);
  showPrompt("Edit Note", data[idx], function (value) {
    data[idx] = { ...data[idx], ...value };
    showList();
  });
}

function archiveNote(id) {
  const idx = data.findIndex((el) => el._id === id);
  data[idx]._archived = !data[idx]._archived;
  showList();
}

showList();

document.getElementById("show-button").onclick = function () {
  showPrompt("Create Note", null, function (value) {
    if (value) {
      data.push(value);
      showList();
    }
  });
};

document.getElementById("show-archived-button").onclick = function (e) {
  console.log(e.target.value);
  showArchived = !showArchived;
  if (showArchived) {
    e.target.value = "Hide archived";
  } else {
    e.target.value = "Show archived";
  }
  showList();
};
