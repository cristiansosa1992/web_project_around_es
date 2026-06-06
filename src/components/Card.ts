import { CardData } from "../utils/constants.js";

export class Card {
  private _name: string;
  private _link: string;
  //no entiendo porque el template o el ejericio no lo dice 
  private _templateSelector: string;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
}