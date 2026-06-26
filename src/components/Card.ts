export interface CardData {
  _id?: string;
  name: string;
  link: string;
  isLiked: boolean;
}

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: (data: CardData) => void;
  private handleDeleteClick: () => void;
  private element!: HTMLElement;
  private handleLikeClick :(isLiked:boolean)=> Promise<boolean|void>;
private isLiked : boolean;
  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (data: CardData) => void,
    handleDeleteClick: () => void,
    handleLikeClick : (isLiked:boolean) => Promise<boolean|void>
  ) {
    this.name = data.name;
    this.link = data.link;
    this.isLiked = data.isLiked;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
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

    likeButton.addEventListener("click",async () => {
      try{
        this.isLiked = !this.isLiked
        console.log(this.isLiked );
        const isLiked = await this.handleLikeClick(this.isLiked);
        console.log(isLiked)
        if (isLiked ===undefined)return
        likeButton.classList.toggle("card__like-button_is-active",isLiked);
        
      }
     catch (err) {
        console.error(err);
     }
    });
  
    deleteButton.addEventListener("click", () => {
      this.handleDeleteClick();
    });

    
    imageElement.addEventListener("click", () => {
      this.handleCardClick({
        name: this.name,
        link: this.link,
        isLiked: this.isLiked,
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

     const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;

   likeButton.classList.toggle("card__like-button_is-active",this.isLiked);

    this.setEventListeners();

    return this.element;
  }

  public removeCard(): void {
    this.element.remove();
  }

}
