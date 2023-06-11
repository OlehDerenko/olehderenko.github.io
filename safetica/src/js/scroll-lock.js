export class ScrollLock {
  constructor() {
    this.$body = document.body;
    this.$scroll = 0;
  }

  enable() {
    this.scroll = window.pageYOffset;
    this.$body.style.overflow = "hidden";
    this.$body.style.position = "fixed";
    this.$body.style.top = `-${this.scroll}px`;
    this.$body.style.width = "100%";
    this.$body.classList.add("active");
  }

  disable() {
    this.$body.style.removeProperty("overflow");
    this.$body.style.removeProperty("position");
    this.$body.style.removeProperty("top");
    this.$body.style.removeProperty("width");
    this.$body.classList.remove("active");
    window.scrollTo(0, this.scroll);
  }
}
