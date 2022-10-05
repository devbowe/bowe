// Benefits lists emulate accordeon logic
const benefitsLists = Array.from(document.querySelectorAll(".benefits__list"));

benefitsLists.forEach((list) => {
    const button = list.querySelector("button");
    const listItems = list.querySelector(".list-items");
    const listItemsHeight = listItems.scrollHeight;

    button.addEventListener("click", () => {
        benefitsLists.forEach((ul, i) => {
            const CURRENT_ID =
                button.parentElement.parentElement.getAttribute("data-id");

            if (Number(CURRENT_ID) === Number(i)) {
                return;
            }

            ul.querySelector(".list-items").style.maxHeight = "0px";
            ul.setAttribute("aria-expanded", "false");

            ul.querySelector("button").firstElementChild.setAttribute(
                "src",
                "assets/benefits/benefits-btn-plus.svg"
            );
        });

        if (list.getAttribute("aria-expanded") === "false") {
            listItems.style.maxHeight = `${listItemsHeight}px`;
            list.setAttribute("aria-expanded", "true");
            button.firstElementChild.setAttribute(
                "src",
                "assets/benefits/benefits-btn-minus.svg"
            );

            // button.innerHTML =
        } else {
            listItems.style.maxHeight = `0px`;
            list.setAttribute("aria-expanded", "false");
            button.firstElementChild.setAttribute(
                "src",
                "assets/benefits/benefits-btn-plus.svg"
            );
        }
    });
});
