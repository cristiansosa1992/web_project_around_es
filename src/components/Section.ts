export class Section<T> {
  private items: T[];
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    { items, renderer }: { items: T[]; renderer: (item: T) => void },
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(): void {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
