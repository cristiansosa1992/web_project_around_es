export class Section<T> {
 
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    {renderer }: { renderer: (item: T) => void },
    containerSelector: string,
  ) {
    
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(items: T[]): void {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
