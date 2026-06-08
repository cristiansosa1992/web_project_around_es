export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: (data: CardData) => void;
  private element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (data: CardData) => void,
  ) {
    this.name = data.name;
    this.link = data.link;
    this.handleCardClick = handleCardClick;
    this.templateSelector = templateSelector;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector(
      this.templateSelector,
    ) as HTMLTemplateElement;

    return template.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private setEventListeners(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;
    const imageElement = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

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

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const titleElement = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;
    const imageElement = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    titleElement.textContent = this.name;
    imageElement.src = this.link;
    imageElement.alt = this.name;

    this.setEventListeners();

    return this.element;
  }
}
