function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  document.body.style.overflowY = "hidden";
  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}

export function showPrompt(text, note, callback) {
  showCover();
  let form = document.getElementById("prompt-form");
  let container = document.getElementById("prompt-form-container");
  document.getElementById("prompt-message").innerHTML = text;

  if (note) {
    form.name.value = note.name;
    form.category.value = note.category;
    form.content.value = note.content;
  } else {
    form.name.value = "";
    form.category.value = "";
    form.content.value = "";
  }

  function complete(value) {
    hideCover();
    container.style.display = "none";
    document.onkeydown = null;
    callback(value);
  }

  form.onsubmit = function () {
    let value = {};

    value.name = form.name.value;
    value.created = new Date().toLocaleDateString();
    value.category = form.category.value;
    value.content = form.content.value;
    value.dates = [];
    value._id = Date.now();

    complete(value);
    return false;
  };

  form.cancel.onclick = function () {
    complete(null);
  };

  document.onkeydown = function (e) {
    if (e.key == "Escape") {
      complete(null);
    }
  };

  let lastElem = form.elements[form.elements.length - 1];
  let firstElem = form.elements[0];

  lastElem.onkeydown = function (e) {
    if (e.key == "Tab" && !e.shiftKey) {
      firstElem.focus();
      return false;
    }
  };

  firstElem.onkeydown = function (e) {
    if (e.key == "Tab" && e.shiftKey) {
      lastElem.focus();
      return false;
    }
  };

  container.style.display = "block";
  form.elements.name.focus();
}
