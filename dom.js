export function makeNote (note) {
  const row = document.createElement("div");
  row.classList.add('note')

  Object.keys(note).forEach(prop => {
    const elem = document.createElement("div");
    elem.classList.add('col');
    elem.innerText = note[prop];
    row.appendChild(elem);
  });
  return row;
}