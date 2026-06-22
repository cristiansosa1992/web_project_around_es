export class Section {
    constructor({ renderer }, containerSelector) {
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }
    renderItems(items) {
        items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.append(element);
    }
}
