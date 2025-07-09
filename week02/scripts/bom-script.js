const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

button.addEventListener("click", () => {

    if (input.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = input.value;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.setAttribute("area-label", "remove the chapter");

        listItem.append(deleteBtn);
        list.append(listItem);

        deleteBtn.addEventListener("click", () => {
            list.removeChild(listItem);
            input.focus();
        });

        input.value = "";
    }

    input.focus()

});
