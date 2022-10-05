const btnOpenForm = document.querySelector(".btn-mobile");
const btnCloseForm = document.querySelector(".close-form");
const form = document.querySelector(".form");

btnOpenForm.addEventListener("click", (e) => {
    form.classList.add("open");
});

btnCloseForm.addEventListener("click", (e) => {
    form.classList.remove("open");
});

//-------------------------  Change select field colors -------------------------
(() => {
    const selects = Array.from(document.querySelectorAll("select"));
    const CSS_VARIABLES = getComputedStyle(document.documentElement);
    const placeholderColor = CSS_VARIABLES.getPropertyValue("--clr-placeholder");
    const fieldColor = CSS_VARIABLES.getPropertyValue("--clr-field");

    selects.forEach((select) => {
        select.style.color = placeholderColor;

        select.addEventListener("change", (e) => {
            if (e.target.value === "" || e.target.value === "nulo") {
                select.style.color = placeholderColor;
            } else {
                select.style.color = fieldColor;
            }
        });
    });
})();

// WORKFLOW LOGIC
const workFlowNavs = Array.from(document.querySelectorAll("[data-workflow-nav]"));
const workFlowCards = Array.from(document.querySelectorAll("[data-workflow-card]"));

workFlowNavs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
        const dataCode = nav.getAttribute("data-workflow-nav");

        workFlowNavs.forEach((el) => el.classList.remove("active"));
        nav.classList.add("active");

        workFlowCards.forEach((card, i) => {
            card.classList.remove("active");

            if (Number(i) === Number(dataCode)) {
                card.classList.add("active");
            }
        });
    });
});

// STRATEGIES LOCIG
const strategyButtons = Array.from(document.querySelectorAll("[data-strategies-button]"));
const strategyCards = Array.from(document.querySelectorAll("[data-strategies-card]"));

strategyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const dataCode = button.getAttribute("data-strategies-button");

        strategyButtons.forEach((el) => el.classList.remove("active"));
        button.classList.add("active");

        strategyCards.forEach((card, i) => {
            card.classList.remove("active");

            if (Number(i) === Number(dataCode)) {
                card.classList.add("active");
            }
        });
    });
});

// NAVBAR LINKS
const upMenus = Array.from(document.querySelectorAll(".up-menu"));
const nav = document.querySelector("nav");
const hamb = document.querySelector(".hamburger");
const headerLinks = Array.from(document.querySelectorAll("[data-header-link]"));

headerLinks.forEach((link) =>
    link.addEventListener("click", (e) => {
        nav.classList.remove("active");
        hamb.classList.remove("active");
    })
);

upMenus.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        const subMenu = el.querySelector(".sub-menu");
        subMenu.classList.add("active");
    });

    el.addEventListener("mouseleave", (e) => {
        const subMenu = el.querySelector(".sub-menu");
        subMenu.classList.remove("active");
    });
});

hamb.addEventListener("click", (e) => {
    nav.classList.toggle("active");

    hamb.classList.toggle("active");
});
