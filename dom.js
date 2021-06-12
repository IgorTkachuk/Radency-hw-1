export function makeNote(note, cbremove, cbedit, cbarchive) {
  const row = document.createElement("div");
  row.classList.add("note");

  Object.keys(note)
    .filter((prop) => prop[0] !== "_")
    .forEach((prop) => {
      const elem = document.createElement("div");
      elem.classList.add("col");
      elem.innerText = note[prop];
      row.appendChild(elem);
    });

  row.appendChild(makeNoteNav(note, cbremove, cbedit, cbarchive));

  return row;
}

function makeNoteNav(note, cbremove, cbedit, cbarchive) {
  const navBar = document.createElement("div");
  navBar.classList.add("note-nav");

  const navEdit = document.createElement("i");
  navEdit.classList.add("fa", "note-nav-el", "fa-pencil");
  navEdit.addEventListener("click", function () {
    const { _id } = note;
    cbedit(_id);
  });

  const navArchive = document.createElement("i");
  navArchive.classList.add("fa", "note-nav-el", "fa-archive");
  navArchive.addEventListener("click", function () {
    const { _id } = note;
    cbarchive(_id);
  });

  const navTrash = document.createElement("i");
  navTrash.classList.add("fa", "note-nav-el", "fa-trash");
  navTrash.addEventListener("click", function () {
    const { _id } = note;
    cbremove(_id);
  });

  navBar.appendChild(navEdit);
  navBar.appendChild(navArchive);
  navBar.appendChild(navTrash);

  return navBar;
}
