export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.handleCardClick = handleCardClick;
        this.templateSelector = templateSelector;
    }
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        return template.content
            .querySelector(".card")
            .cloneNode(true);
    }
    setEventListeners() {
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        const imageElement = this.element.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", () => {
            this.element.remove();
        });
        imageElement.addEventListener("click", () => {
            this.handleCardClick({
                name: this.name,
                link: this.link,
            });
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        const titleElement = this.element.querySelector(".card__title");
        const imageElement = this.element.querySelector(".card__image");
        titleElement.textContent = this.name;
        imageElement.src = this.link;
        imageElement.alt = this.name;
        this.setEventListeners();
        return this.element;
    }
}
