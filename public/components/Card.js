export class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this.name = data.name;
        this.link = data.link;
        this.isLiked = data.isLiked;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeClick = handleLikeClick;
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
        likeButton.addEventListener("click", async () => {
            try {
                this.isLiked = !this.isLiked;
                console.log(this.isLiked);
                const isLiked = await this.handleLikeClick(this.isLiked);
                console.log(isLiked);
                if (isLiked === undefined)
                    return;
                likeButton.classList.toggle("card__like-button_is-active", isLiked);
            }
            catch (err) {
                console.error(err);
            }
        });
        deleteButton.addEventListener("click", async () => {
            try {
                await this.handleDeleteClick();
                this.element.remove();
            }
            catch (err) {
                console.error(err);
            }
        });
        imageElement.addEventListener("click", () => {
            this.handleCardClick({
                name: this.name,
                link: this.link,
                isLiked: this.isLiked,
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
        const likeButton = this.element.querySelector(".card__like-button");
        likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
        this.setEventListeners();
        return this.element;
    }
}
