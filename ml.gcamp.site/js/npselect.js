const KEY_CODES = ["Enter"];

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SELECTORS = {
  option: ".select__option",
};

const validateMultiple = (selects) => {
  return selects.map((select) => select.validate()).every((value) => value);
};

class SearchableSelect {
  constructor({
    root,
    button,
    input,
    options = [],
    onSelect,
    onInput,
    onOpen = () => {},
    onMounted = () => {},
  }) {
    this.options = options;
    this.filtered = options;
    this.open = false;
    this.value = "";
    this.selected = null;
    this.button = button;
    this.input = input;
    this.disabled = false;

    this.$root = root;
    this.$wrapper = null;
    this.$button = null;
    this.$input = null;
    this.$select = null;
    this.$placeholder = null;

    this.onSelect = onSelect;
    this.onInput = onInput;
    this.onOpen = onOpen;
    this.onMounted = onMounted;

    this.#build();
  }

  validate() {
    const isValid = !!this.selected;

    console.log({ disabled: this.disabled });

    if (this.disabled) {
      return false;
    }

    this.$wrapper.ariaInvalid = !isValid;

    return isValid;
  }

  setOptions(options) {
    this.options = options;
    this.filtered = options;

    if (!this.filtered.length) {
      this.$select.classList.add("empty");
      this.$placeholder.classList.add("empty");
    } else {
      this.$select.classList.remove("empty");
      this.$placeholder.classList.remove("empty");
    }

    this.#createOptions();
  }

  getOptions() {
    return this.options;
  }

  setFiltered(filtered) {
    this.filtered = filtered;

    if (!this.filtered.length) {
      this.$select.classList.add("empty");
      this.$placeholder.classList.add("empty");
    } else {
      this.$select.classList.remove("empty");
      this.$placeholder.classList.remove("empty");
    }

    this.#createOptions();
  }

  getFiltered() {
    return this.filtered;
  }

  setOpen(open) {
    if (open) {
      this.#handleOpen();
    } else {
      this.#handleClose();
    }

    this.open = open;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    this.$button.disabled = disabled;
    this.$button.textContent = this.button.text;

    const $icon = document.createElement("span");
    $icon.innerHTML = this.button.icon;
    this.$button.appendChild($icon);

    this.$wrapper.ariaDisabled = disabled;
  }

  #build() {
    const $wrapper = this.#createSelect();
    this.$wrapper = $wrapper;
    this.$root.appendChild($wrapper);
    this.onMounted(this);

    document.addEventListener("click", (e) => {
      if (e.currentTarget !== this.$root && !this.$root.contains(e.target)) {
        this.setOpen(false);
      }
    });
  }

  #createSelect() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("select");

    const $button = document.createElement("button");
    $button.classList.add("select__button");
    $button.textContent = this.button.text;
    $button.type = "button";

    $button.addEventListener("click", () => {
      if (this.open) {
        this.#handleClose();
      } else {
        this.#handleOpen();
      }
    });

    const $icon = document.createElement("span");
    $icon.innerHTML = this.button.icon;
    $button.appendChild($icon);

    $wrapper.appendChild($button);

    this.$button = $button;

    const $input = document.createElement("input");
    $input.classList.add("select__input");
    $input.name = this.input.name;
    $input.placeholder = this.input.placeholder;
    $input.autocomplete = "off";

    const debouncedHandleInput = debounce((e) => this.#handleInput(e));

    $input.addEventListener("input", debouncedHandleInput);
    $input.addEventListener("keydown", (e) => {
      if (e.code === "ArrowDown") {
        this.$select.querySelector(".select__option").focus();
      }
    });
    $wrapper.appendChild($input);
    this.$input = $input;

    const $select = document.createElement("div");
    $select.classList.add("select__box", "empty");
    $wrapper.append($select);
    this.$select = $select;

    const $placeholder = document.createElement("div");
    $placeholder.classList.add("select__placeholder");
    $placeholder.textContent =
      "Не знайдено відділень, спробуйте вибрати інше місто.";
    $wrapper.append($placeholder);
    this.$placeholder = $placeholder;

    return $wrapper;
  }

  #createOptions() {
    this.$select.replaceChildren();

    this.filtered.forEach((item) => {
      const $option = document.createElement("div");
      $option.classList.add("select__option");
      $option.value = item.value;
      $option.textContent = item.label;
      $option.tabIndex = 0;

      if (item.value === this.value) {
        $option.classList.add("selected");
      }

      $option.addEventListener("click", (e) =>
        this.#handleSelect($option, item)
      );
      $option.addEventListener("keydown", (e) => {
        if (KEY_CODES.includes(e.code)) {
          this.#handleSelect($option, item);
        }
      });

      this.$select.appendChild($option);
    });
  }

  #handleOpen() {
    const openable = this.onOpen(this);

    if (openable === false) {
      this.setDisabled(true);
    }

    if (this.disabled) return;

    this.$wrapper.classList.add("open");
    this.$input.focus();
    this.open = true;
  }

  #handleClose() {
    this.$wrapper.classList.remove("open");
    this.open = false;
  }

  #handleSelect($option, item) {
    this.$root
      .querySelectorAll(SELECTORS.option)
      .forEach((option) => option.classList.remove("selected"));

    $option.classList.add("selected");

    this.#handleClose();

    this.$button.textContent = item.label;

    const $icon = document.createElement("span");
    $icon.innerHTML = this.button.icon;
    this.$button.appendChild($icon);
    this.selected = item;
    this.value = item.value;
    this.$input.value = item.value;

    this.onSelect(item, this);
    this.validate();
  }

  #handleInput(e) {
    const value = e.target.value;
    this.onInput(value, this);
    this.value = value;
  }
}
