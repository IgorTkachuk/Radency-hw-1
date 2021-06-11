import {makeNote} from "./dom.js";
import {showPrompt} from "./modal.js";

const data = [
  {
    name: "Shopping list",
    created: "2021.06.11",
    category: "Task",
    content: "Tomatoes, bread",
    dates: []
  },
  {
    name: "The theory of evolution",
    created: "2021.06.11",
    category: "Random Thought",
    content: "The evolution...",
    dates: []
  },
  {
    name: "New Feature",
    created: "2021.06.11",
    category: "Idea",
    content: "Implement new ...",
    dates: []
  },
]

const list = [];

function showList () {
  const root = document.getElementById("root");
  list.length = 0;
  root.innerHTML = "";

  data.forEach(note => {
    list.push(makeNote(note))
  });

  list.forEach(note => {
    root.appendChild(note);
  })
}

showList();

document.getElementById('show-button').onclick = function() {
  showPrompt("Create Note", function(value) {
    data.push({name: value});
    showList();
  });
};