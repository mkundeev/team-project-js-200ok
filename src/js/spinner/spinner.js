export class VisibleComponent {
  constructor({ selector, className, isHide = false }) {
    this.selector = document.querySelector(selector);
    this.className = className;

    if (isHide) {
      this.hide();
    }
  }

  hide() {
    this.selector.classList.add(this.className);
  }

  show() {
    this.selector.classList.remove(this.className);
  }
}

export const spinner = new VisibleComponent({
  selector: '.js-spinner',
  className: 'visually-hidden',
  isHide: true,
});