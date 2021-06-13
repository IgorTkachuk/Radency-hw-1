class Category {
  constructor(categories) {
    this._categories = categories;
    this.tableCaption = ["Note Category", "Active", "Archived"];
  }

  getHTMLElement = () => {
    const elRoot = document.createElement("div");

    const elLabel = document.createElement("label");
    elLabel.innerText = "Category: ";
    elLabel.htmlFor = "category";

    const elSelect = document.createElement("select");
    elSelect.name = "category";
    elSelect.id = "category";

    this._categories.forEach((category) => {
      const elOpt = document.createElement("option");
      elOpt.innerText = category;
      elSelect.appendChild(elOpt);
    });

    elRoot.appendChild(elLabel);
    elRoot.appendChild(elSelect);

    return elRoot;
  };

  getCategorySummary = (data) => {
    const sum = data.reduce((acc, note) => {
      let categoryInstance = acc.find((el) => el.category === note.category);
      if (!categoryInstance) {
        categoryInstance = {
          category: note.category,
        };
        acc.push(categoryInstance);
      }

      if (note._archived) {
        categoryInstance.archived = (categoryInstance.archived ?? 0) + 1;
      } else {
        categoryInstance.active = (categoryInstance.active ?? 0) + 1;
      }

      return acc;
    }, []);

    console.log(sum);
    return sum;
  };

  getCategoryCaption = () => {
    const caption = document.createElement("div");
    caption.classList.add("note-caption");

    this.tableCaption.forEach((el) => {
      const col = document.createElement("div");
      col.classList.add("col-caption");
      col.innerText = el;
      caption.appendChild(col);
    });

    return caption;
  };

  getCategoryTable = (data) => {
    const summary = this.getCategorySummary(data);

    const root = document.createElement("div");
    root.classList.add("category-summary");

    root.appendChild(this.getCategoryCaption());

    summary.forEach((el) => {
      const row = document.createElement("div");
      row.classList.add("category-summary-row");

      const colName = document.createElement("div");
      colName.classList.add("category-summary-col");
      colName.innerText = el.category;

      const colActive = document.createElement("div");
      colActive.classList.add("category-summary-col");
      colActive.innerText = el.active ?? 0;

      const colArchived = document.createElement("div");
      colArchived.classList.add("category-summary-col");
      colArchived.innerText = el.archived ?? 0;

      row.appendChild(colName);
      row.appendChild(colActive);
      row.appendChild(colArchived);

      root.appendChild(row);
    });

    return root;
  };
}

export default Category;
