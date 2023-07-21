const createSelects = (warehouseConfig, cityConfig, formConfig) => {
  const API_URL = "https://api.novaposhta.ua/v2.0/json/";
  const API_KEY = "6f8737e79a9ef5fdbba22e360c0a5d4b";

  const getCities = async (input) => {
    const API_CONFIG = {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: input,
        Limit: "30",
      },
    };

    const response = await fetch(API_URL, {
      body: JSON.stringify(API_CONFIG),
      method: "POST",
    });

    const { data } = await response.json();

    return data[0].Addresses.map((item) => ({
      label: item.Present,
      value: item.MainDescription,
    }));
  };

  const getWarehouses = async (city) => {
    const response = await fetch(API_URL, {
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: city,
        },
      }),
      method: "POST",
    });

    const { data } = await response.json();

    const addresses = data.map((address) => ({
      label: `№ ${address.Number}, ${address.ShortAddress}`,
      value: `№ ${address.Number}, ${address.ShortAddress}`,
    }));

    return addresses;
  };

  const ARROW_DOWN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.5 7a.956.956 0 01-.657-.256l-5.57-5.25a.839.839 0 010-1.237.968.968 0 011.312 0L6.5 4.888 11.415.257a.968.968 0 011.313 0 .839.839 0 010 1.237l-5.572 5.25A.956.956 0 016.5 7z"
    />
  </svg>`;

  const warehouseSelect = new SearchableSelect({
    root: document.querySelector(warehouseConfig.selector),
    button: {
      text: "Виберіть Відділення",
      icon: ARROW_DOWN_ICON,
    },
    input: {
      name: "warehouse",
      placeholder: "Виберіть Відділення",
    },
    onMounted: (select) => {
      select.setDisabled(true);
    },
    onSelect: async (value, select) => {
      select.setOptions(select.getOptions());
    },
    onInput: async (value, select) => {
      select.setFiltered(
        select.getOptions().filter((option) => option.value.includes(value))
      );
    },
    onOpen: (select) => {
      if (!select.getOptions().length) {
        return false;
      }
    },
  });

  const citySelect = new SearchableSelect({
    root: document.querySelector(cityConfig.selector),
    button: {
      text: "Виберіть Місто",
      icon: ARROW_DOWN_ICON,
    },
    input: {
      name: "city",
      placeholder: "Виберіть Місто",
    },
    onSelect: async (item) => {
      const options = await getWarehouses(item.value);

      warehouseSelect.setOptions(options);
      warehouseSelect.setDisabled(false);
      warehouseSelect.setOpen(true);
    },
    onInput: async (value, select) => {
      if (value.length >= 3) {
        const options = await getCities(value);

        select.setOptions(options);
      }
    },
  });

  const form = document.querySelector(formConfig.selector);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isValid = validateMultiple([warehouseSelect, citySelect]);

    if (!isValid) {
      return;
    }

    const data = new FormData(e.target);

    const connect = Array.from(
      document.querySelectorAll(".inputs-wrapers input")
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());

    const body = getFormData({
      name: data.get("name"),
      phone: data.get("phone"),
      city: data.get("city"),
      warehouse: data.get("warehouse"),
      connect,
      page: data.get("page"),
    });

    await fetch("/server/mail.php", {
      method: "POST",
      body,
    });
  });
};
