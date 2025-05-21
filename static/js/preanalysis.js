function changeWidthValue(elementId, newValue) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.width = `${newValue}%`;
  }
}
function getTextByA24(value) {
  switch (value) {
    case "0":
      return "не указано";
    case "1":
      return "Желание значительно больше возможностей";
    case "2":
      return "Желания незначительно больше возможностей";
    case "3":
      return "Возможности соответствуют желаниям";
    case "4":
      return "Возможности незначительно больше желания";
    case "5":
      return "Возможности значительно больше желания";
    case "6":
      return "Нет желания и нет возможностей";
  }
}
function getTextbyA34(value) {
  switch (value) {
    case "1":
      return "Меняем окружение";
    case "2":
      return "Меняем поведение (привычки)";
    case "3":
      return "Меняем мышление";
    case "4":
      return "Меняем установки";
    case "5":
      return "Работаем с  идентичностью";
  }
}

function getTextbyA44(value) {
  switch (value) {
    case "1":
      return "Практики (техники)";
    case "2":
      return "Практические действия (план)";
    case "3":
      return "Книги";
    case "4":
      return "Видео (включая фильмы)";
    case "5":
      return "Обучение";
    case "6":
      return "Работа с коучем";
    case "7":
      return "Работа с ментором/наставником";
    case "8":
      return "Работа с психологом";
    case "9":
      return "Трекинг";
    case "10":
      return "Нетрадиционные методы";
    case "11":
      return "Практики, техники работы с эмоциями";
    case "12":
      return "Практики, техники работы с поведением";
  }
}
function processSsupport(value) {
  switch (value) {
    case "1":
      return 'Самостоятельно ("Парус")';
    case "2":
      return 'В команде ("БОТ (лодка)")';
    case "3":
      return 'Индивидуально с командой экспертов ("Яхта")';

    default:
      return "Не указано";
  }
}
function processFollowing(value) {
  switch (value) {
    case "1":
      return "Индивидуальные рекомендации эксперта Коуча";

    case "2":
      return "Треккинг";

    case "3":
      return "CheckUp";

    case "4":
      return "Коучинговый продукт";

    default:
      return "Не указано";
  }
}

function Hor_Plan(value) {
  switch (value) {
    case "1":
      return "6";
    case "2":
      return "12";
    case "3":
      return "18";
    case "4":
      return "24";
    case "5":
      return "36";
    default:
      return "Не указано";
  }
}

function Speed_Plan(value) {
  switch (value) {
    case "1":
      return "Быстрая";
    case "2":
      return "Средняя";
    case "3":
      return "Умеренная";
    default:
      return "Не указано";
  }
}

function Control_Plan(value) {
  switch (value) {
    case "1":
      return "По шаговый";
    case "2":
      return "По отклонениям";
    case "3":
      return "По результату";
    default:
      return "Не указано";
  }
}

function changeStep(value) {
  if (value != 0) {
    return 11 - value;
  } else {
    return 0;
  }
}

/* -------------------------- */
function loadSelfE() {
  // Определяем значения по умолчанию заранее
  const defaultValuesStep1 = [9, 10, 8, 3, 1, 8, 7, 7]; // Значения по умолчанию для step1
  const defaultValuesStep2 = [9, 10, 8, 3, 1, 8, 7, 9]; // Значения по умолчанию для step2

  fetch("/preanalysis/get" + document.getElementById("session").value)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Логи данных

      const step1 = getStepValues(data, "combo_box_question_2.1_r", "_c1", defaultValuesStep1);
      const step2 = getStepValues(data, "combo_box_question_2.1_r", "_c3", defaultValuesStep2);

      // Применяем преобразование для "Устойчивости" и "Страстной приверженности"
      const adjustedStep1 = adjustSpecificValues(step1);
      const adjustedStep2 = adjustSpecificValues(step2);

      // Обновление средних значений на основе калиброванных массивов
      updateAverageValues(adjustedStep1, adjustedStep2);

      // Выводим средние значения в HTML-элементы
      document.getElementById("average-value-01").textContent = window.averageStep1.toFixed(2);
      document.getElementById("average-value-02").textContent = window.averageStep2.toFixed(2);

		const element01 = document.querySelector(".level01");
		const element02 = document.querySelector(".level02");

      if (element01) {
        let newAfterValue = `${window.averageStep1 * 10}%`;
        // Устанавливаем новые значения для CSS-переменных
        element01.style.setProperty("--after-left", newAfterValue);
        console.log(`Setting after-left to: ${newAfterValue}`);
      }

      if (element02) {
        let newBeforeValue = `${window.averageStep2 * 10}%`;
        // Устанавливаем новые значения для CSS-переменных
        element02.style.setProperty("--before-left", newBeforeValue);
        console.log(`Setting before-left to: ${newBeforeValue}`);
      }

      for (let i = 1; i <= 8; i++) {
        updateWidthValues(adjustedStep1, adjustedStep2, i);
      }

      // Дополнительные функции
      loadProtiv(data);
      loadPossibility(data, Object.keys(data));
      noFocus(data);
      methodsOfDevelopment(data);

      let ulElement = document.getElementById("development_list");
      ulElement.innerHTML = "";
      DirectionOfDevelopment(data, Object.keys(data));
      resources(data);
      patterns(data);
      weakstrong(data);
      plannig(data);
      devproject(data);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);

      const step1 = defaultValuesStep1; // Теперь доступны
      const step2 = defaultValuesStep2; // Теперь доступны

      // Применяем преобразование для "Устойчивости" и "Страстная приверженность"
      const adjustedStep1 = adjustSpecificValues(step1);
      const adjustedStep2 = adjustSpecificValues(step2);

      updateAverageValues(adjustedStep1, adjustedStep2);

      // Выводим значения по умолчанию в HTML-элементы
      document.getElementById("average-value-01").textContent = window.averageStep1.toFixed(2);
      document.getElementById("average-value-02").textContent = window.averageStep2.toFixed(2);


		const element01 = document.querySelector(".level01");
		const element02 = document.querySelector(".level02");

      if (element01) {
        let newAfterValue = `${window.averageStep1 * 10}%`;
        // Устанавливаем новые значения для CSS-переменных
        element01.style.setProperty("--after-left", newAfterValue);
        console.log(`Setting after-left to: ${newAfterValue}`);
      }

      if (element02) {
        let newBeforeValue = `${window.averageStep2 * 10}%`;
        // Устанавливаем новые значения для CSS-переменных
        element02.style.setProperty("--before-left", newBeforeValue);
        console.log(`Setting before-left to: ${newBeforeValue}`);
      }

      // Вызываем обновление ширины значений по умолчанию
      for (let i = 1; i <= 8; i++) {
        updateWidthValues(adjustedStep1, adjustedStep2, i);
      }
    });
}

function getStepValues(data, question, suffix, defaultValues) {
  var keys = Object.keys(data);
  var targetKeys = keys.filter(function (key) {
    return key.includes(question) && key.endsWith(suffix);
  });

  var stepValues = targetKeys.map(function (key) {
    return parseInt(data[key], 10);
  });

  // Если нет данных, используем значения по умолчанию
  if (stepValues.length === 0) {
    return defaultValues;
  }
  return stepValues;
}

function adjustSpecificValues(values) {
  return values.map((value, index) => {
    // Применяем калибровку по заданным индексам
    // Мы предположим, что индексы должны изменяться
    // для корректного результата, а именно на 3 и 4
    if (index === 3 || index === 4) {
      return 11 - value; // Если это соответствующие индексы, производим калибровку
    }
    return value; // Возвращаем значение без изменений для остальных индексов
  });
}

// Обновление значений для средних значений по умолчанию и калиброванным
function updateAverageValues(step1, step2) {
  window.averageStep1 = step1.reduce((total, value) => total + value, 0) / step1.length;
  window.averageStep2 = step2.reduce((total, value) => total + value, 0) / step2.length;

  // В качестве теста/дебага добавим вывод значений
  console.log("Average Step 1:", window.averageStep1);
  console.log("Average Step 2:", window.averageStep2);
}

function updateWidthValues(step1, step2, index) {
  let elementId1 = `step1_${index}`;
  let newValue1 = step1[index - 1] * 10; // Ширина для step1
  let elementId2 = `step2_${index}`;
  let newValue2 = step2[index - 1] * 10; // Ширина для step2
  changeWidthValue(elementId2, newValue2);
  changeWidthValue(elementId1, newValue1);
}

/* -------------------------- */

function resources(data) {
  document.getElementById("support").textContent = processSsupport(data["summary_support_value"]);
  document.getElementById("following").textContent = processFollowing(data["summary_following_value"]);
}
function weakstrong(data) {
  let strong = [];
  let weak = [];
  let strong_keys = {
    1: "Ум",
    2: "Гибкость",
    3: "Удачливость",
    4: "Трудолюбие",
    5: "Воображение",
    6: "Общительность",
    7: "Чувство юмора",
    8: "Другое",
  };
  let weak_keys = {
    1: "Эмоциональность",
    2: "Скептицизм",
    3: "Осторожность",
    4: "Прилежность",
    5: "Сам в себе",
    6: "Сам по себе",
    7: "Исполненность сознания долга",
    8: "Самоуверенность",
    9: "Театральность",
    10: "Богатое воображение",
    11: "Увлекательность",
    12: "Другое",
  };
  for (let key in data) {
    if (key === "combo_box_A15.1" || key === "combo_box_A15.2" || key === "combo_box_A15.3") {
      if (data[key] == "0" || data[key] == "8") {
        continue;
      } else {
        strong.push(strong_keys[data[key]]);
      }
    }
    if (key === "combo_box_A16.1" || key === "combo_box_A16.2" || key === "combo_box_A16.3") {
      if (data[key] == "0" || data[key] == "12") {
        continue;
      } else {
        weak.push(weak_keys[data[key]]);
      }
    }
    if (key === "combo_box_A15.4" || key === "combo_box_A15.5" || key === "combo_box_A15.6") {
      if (data[key] !== "" && data[key] !== "0") {
        strong.push(data[key]);
      }
      //strong.push(data[key]);
    }
    if (key === "combo_box_A16.4" || key === "combo_box_A16.5" || key === "combo_box_A16.6") {
      if (data[key] !== "" && data[key] !== "0") {
        weak.push(data[key]);
      }
    }
  }
  // clear the weak_points
  let ulElement = document.getElementById("weak_points");
  ulElement.innerHTML = "";
  weak.forEach(function (value) {
    let liElement = document.createElement("li");
    liElement.textContent = value;
    ulElement.appendChild(liElement);
  });
  // clear the strong_points
  ulElement = document.getElementById("strong_points");
  ulElement.innerHTML = "";
  strong.forEach(function (value) {
    let liElement = document.createElement("li");
    liElement.textContent = value;
    ulElement.appendChild(liElement);
  });
}
function patterns(data) {
  document.getElementById("kjo_pattern_1").innerText = data["KJOP1"];
  document.getElementById("kjo_pattern_2").innerText = data["KJOP2"];
}
function methodsOfDevelopment(data) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById("A44." + i).textContent = getTextbyA44(data["combo_box_A44." + i]);
  }
}

function DirectionOfDevelopment(data, keys) {
  let targetKeys = keys.filter(function (key) {
    return key.includes("combo_box_A34.");
  });
  let valForDevelopment = targetKeys.map(function (key) {
    return data[key];
  });
  let ulElement = document.getElementById("development_list");
  valForDevelopment.forEach(function (value) {
    if (value !== "0") {
      let liElement = document.createElement("li");
      liElement.textContent = getTextbyA34(value);
      ulElement.appendChild(liElement);
    }
  });
}

function loadProtiv(data) {
  // for each item-kjo__item-check class
  let items = document.getElementsByClassName("item-kjo__item-check");
  // remove check-map-active class
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("check-map-active");
  }
  //for check_1 to check_6
  for (let i = 1; i <= 6; i++) {
    // if check_1 is checked
    if (data["check_" + i] == true) {
      items[i - 1].classList.add("check-map-active");
    }
  }
}
function loadPossibility(data, keys) {
  let bNUKeys = keys.filter(function (key) {
    return key.includes("A13.1") && key.endsWith("_value");
  });
  let bNUValue = bNUKeys.map(function (key) {
    return data[key];
  });
  let opportunitiesKeys = keys.filter(function (key) {
    return key.includes("A13.2") && key.endsWith("_value");
  });
  let opportunitiesValue = opportunitiesKeys.map(function (key) {
    return data[key];
  });
  let items = document.getElementsByClassName("scope__item");
  let bNUCount = 0;
  let opportunitiesCount = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains("scope-active")) {
      items[i].textContent = bNUValue[bNUCount];
      bNUCount++;
    } else {
      items[i].textContent = opportunitiesValue[opportunitiesCount];
      opportunitiesCount++;
    }
  }
}
function loadITR() {
  // for each select tag
  let selects = document.getElementsByTagName("select");
  // remove "hidden" for each select
  for (let i = 0; i < selects.length; i++) {
    selects[i].removeAttribute("hidden");
  }
  loadSelfE();
}
function noFocus(data) {
  document.getElementById("potential").textContent = getTextByA24(data["combo_box_A24"]);
  let count_target = data["combo_box_A39"];
  document.getElementById("count_target").textContent = count_target;
  let valueFocus = data["summary_yes-or-no_value"];
  let valueFocusId = document.getElementById("isFocus");
  switch (valueFocus) {
    case "0":
      valueFocusId.textContent = "Фокуса нет";
      break;
    case "1":
      valueFocusId.textContent = "Фокус есть";
      break;
  }
  let valueA41 = data["combo_box_A41"];
  let valueA41id = document.getElementById("targetOrMoney");
  switch (valueA41) {
    case "1":
      valueA41id.textContent = "Цель";
      break;
    case "2":
      valueA41id.textContent = "Состояние";
      break;
    case "3":
      valueA41id.textContent = "Развитие";
      break;
  }
  let valueA33 = data["combo_box_A33"];
  let valueA33id = document.getElementById("yesornochange");
  switch (valueA33) {
    case "0":
      valueA33id.textContent = "Не указано";
      break;
    case "1":
      valueA33id.textContent = "Нет";
      break;
    case "2":
      valueA33id.textContent = "Есть";
      break;
  }
}

function plannig(data) {
  let hor = document.getElementById("Horizont");
  let hor_value = data["monthVal"];
  hor.textContent = Hor_Plan(hor_value);

  let control = document.getElementById("Controlling");
  let control_value = data["question_11.3_select"];
  control.textContent = Control_Plan(control_value);

  let sprint = document.getElementById("Speed");
  let sprint_value = data["summary_speed_value"];
  sprint.textContent = Speed_Plan(sprint_value);
}

function loadPossibility(data) {
  var keys = Object.keys(data);
  var targetKeysStep1 = keys.filter(function (key) {
    return key.includes("judgments_features_know_ but_not_used") && key.endsWith("_value");
  });
  var step1 = targetKeysStep1.map(function (key) {
    return data[key];
  });

  var targetKeysStep2 = keys.filter(function (key) {
    return key.includes("judgments_unused_opportunities") && key.endsWith("_value");
  });
  var step2 = targetKeysStep2.map(function (key) {
    return data[key];
  });

  for (let i = 1; i <= 6; i++) {
    if (document.getElementsByClassName("scope__item scope-active") && document.getElementsByClassName("scope__item scope-active").textContent != step1[i]) {
      document.getElementsByClassName("scope__item scope-active").textContent = step1[i];
    }
  }

  for (let j = 1; j <= 6; j++) {
    if (document.getElementsByClassName("scope__item") && document.getElementsByClassName("scope__item").textContent != step2[j]) {
      document.getElementsByClassName("scope__item").textContent = step2[j];
    }
  }
}
function vector(key, value) {
  switch (key) {
    case "feedback-to-feedback_ag-person_good-life_comment_1":
      return ["Личность", "чудесная жизнь", vector1(value)];
    case "feedback-to-feedback_ag-person_good-life_comment_2":
      return ["Личность", "чудесная жизнь", vector1(value)];
    case "feedback-to-feedback_ag-person_good-life_comment_3":
      return ["Личность", "чудесная жизнь", vector1(value)];
    case "feedback-to-feedback_ag-person_well-being_comment_1":
      return ["Личность", "самочувствие", vector2(value)];
    case "feedback-to-feedback_ag-person_well-being_comment_2":
      return ["Личность", "самочувствие", vector2(value)];
    case "feedback-to-feedback_ag-person_well-being_comment_3":
      return ["Личность", "самочувствие", vector2(value)];
    case "feedback-to-feedback_inner-circle-ag_family_comment1":
      return ["Близкий круг", "семья", vector3(value)];
    case "feedback-to-feedback_inner-circle-ag_family_comment2":
      return ["Близкий круг", "семья", vector3(value)];
    case "feedback-to-feedback_inner-circle-ag_family_comment3":
      return ["Близкий круг", "семья", vector3(value)];
    case "feedback-to-feedback_inner-circle-ag_close-people_comment1":
      return ["Близкий круг", "близкие люди", vector4(value)];
    case "feedback-to-feedback_inner-circle-ag_close-people_comment2":
      return ["Близкий круг", "близкие люди", vector4(value)];
    case "feedback-to-feedback_inner-circle-ag_close-people_comment3":
      return ["Близкий круг", "близкие люди", vector4(value)];
    case "feedback-to-feedback_inner-circle-ag_build-or-end_comment1":
      return ["Близкий круг", "выстраивание/прекращение", vector5(value)];
    case "feedback-to-feedback_inner-circle-ag_build-or-end_comment2":
      return ["Близкий круг", "выстраивание/прекращение", vector5(value)];
    case "feedback-to-feedback_inner-circle-ag_build-or-end_comment3":
      return ["Близкий круг", "выстраивание/прекращение", vector5(value)];
    case "feedback-to-feedback_ag-career_career_comment1":
      return ["Карьера", "карьера", vector6(value)];
    case "feedback-to-feedback_ag-career_career_comment2":
      return ["Карьера", "карьера", vector6(value)];
    case "feedback-to-feedback_ag-career_career_comment3":
      return ["Карьера", "карьера", vector6(value)];
    case "feedback-to-feedback_ag-career_self-realization_comment1":
      return ["Карьера", "самореализация", vector7(value)];
    case "feedback-to-feedback_ag-career_self-realization_comment2":
      return ["Карьера", "самореализация", vector7(value)];
    case "feedback-to-feedback_ag-career_self-realization_comment3":
      return ["Карьера", "самореализация", vector7(value)];
    case "feedback-to-feedback_ag-society_personal-brand-development_comment1":
      return ["Общество", "развитие личностного бренда", vector8(value)];
    case "feedback-to-feedback_ag-society_personal-brand-development_comment2":
      return ["Общество", "развитие личностного бренда", vector8(value)];
    case "feedback-to-feedback_ag-society_personal-brand-development_comment3":
      return ["Общество", "развитие личностного бренда", vector8(value)];

    case "feedback-to-feedback_ag-society_fame_comment1":
      return ["Общество", "известность в широких кругах", vector9(value)];
    case "feedback-to-feedback_ag-society_fame_comment2":
      return ["Общество", "известность в широких кругах", vector9(value)];
    case "feedback-to-feedback_ag-society_fame_comment3":
      return ["Общество", "известность в широких кругах", vector9(value)];

    case "feedback-to-feedback_ag-society_join-to-circle_comment":
      return ["Общество", "войти в круг значимых лиц (города/области/региона/страны/мира)", vector10(value)];
    case "feedback-to-feedback_ag-society_safety_comment":
      return ["Общество", "безопасность", vector11(value)];
  }
}
function vector1(value) {
  switch (value) {
    case 1:
      return "Спорт/игры";
    case 2:
      return "Таланты/творчество(сам)";
    case 3:
      return "Эстетика/искусство(потребление)";
    case 4:
      return "Путешествия";
    case 5:
      return "Интересные люди";
    case 6:
      return "События/эмоции/подарки";
    case 7:
      return "Природа/разумный эгоизм";
    case 8:
      return "Литература/история";
    case 9:
      return "Чувство юмора";
  }
}

function vector2(value) {
  switch (value) {
    case 1:
      return "Экология/окружение";
    case 2:
      return "Репродуктивное здоровье";
    case 3:
      return "Молдость/долголетие/диагностика";
    case 4:
      return "Физическая форма";
    case 5:
      return "Психологическое здоровье/ясность ума/стрессоустойчивость";
    case 6:
      return "Питания";
    case 7:
      return "Дыхание";
    case 8:
      return "Сон";
    case 9:
      return "Внешность";
  }
}

function vector3(value) {
  switch (value) {
    case 1:
      return "Семейный бюджет/экономика семьи";
    case 2:
      return "Родители(бабушки/дедушки)";
    case 3:
      return "Супруг/супруга";
    case 4:
      return "Дети/внуки";
    case 5:
      return "Дом/уют/безопасность";
    case 6:
      return "Транспорт/техника";
    case 7:
      return "Родня";
    case 8:
      return "Мир семьи/традиции/правила/ценности";
    case 9:
      return "Сексуальность";
    case 10:
      return "Влюблённость";
    case 11:
      return "Любимый/любимая";
    case 12:
      return "Общение/связи/коммуникации";
    case 13:
      return "Динамика отношений";
    case 14:
      return "Преодоление непреодолимых преград";
    case 15:
      return "Длительные отношения";
    case 16:
      return "Выход из созависимых отношений";
  }
}

function vector4(value) {
  switch (value) {
    case 1:
      return "Влюблённость";
    case 2:
      return "Любимый/любимая";
    case 3:
      return "Общение/связи/коммуникации";
    case 4:
      return "Динамика отношений";
    case 5:
      return "Преодоление непреодолимых преград";
  }
}

function vector5(value) {
  switch (value) {
    case 1:
      return "Длительные отношения";
    case 2:
      return "Выход из созависимых отношений";
    case 3:
      return "Избавиться от токсичных отношений";
  }
}

function vector6(value) {
  switch (value) {
    case 1:
      return "Партнёры";
    case 2:
      return "Команда/штат/корпоративная культура";
    case 3:
      return "Инвестиции";
    case 4:
      return "Экономика деятельности";
    case 5:
      return "Менеджмент/руководитель";
    case 6:
      return "Юридические вопросы/безопасность";
    case 7:
      return "Профессионализм";
    case 8:
      return "Карьера";
    case 9:
      return "Высокий статус";
    case 10:
      return "Клиенты/маркетинг/CRM";
    case 11:
      return "Удовлетворение от результатов деятельности";
  }
}

function vector7(value) {
  switch (value) {
    case 1:
      return "Цели/мечты/амбиции";
    case 2:
      return "Навыки/тренинги/мышление";
    case 3:
      return "Обучение/знание/эрудиция";
    case 4:
      return "Языки";
    case 5:
      return "Наставники";
    case 6:
      return "Тренды";
    case 7:
      return "Духовное развитие/вера/медитации";
    case 8:
      return "Эмоциональный интеллект/психология";
    case 9:
      return "Лидерство";
  }
}

function vector8(value) {
  switch (value) {
    case 1:
      return "Бренд";
    case 2:
      return "Соц.группы/соц.сети";
    case 3:
      return "Выступления/публикации/самопрезентация";
  }
}

function vector9(value) {
  switch (value) {
    case 1:
      return "Друзья";
    case 2:
      return "Контакты";
    case 3:
      return "Випы";
    case 4:
      return "Ученики";
    case 5:
      return "Прошлое/личный мир прошлого";
  }
}

function vector10(value) {
  switch (value) {
    case 1:
      return "Нетворкинг";
    case 2:
      return "Профессиональная среда/статус";
  }
}

function vector11(value) {
  switch (value) {
    case 1:
      return "Минимизация рисков";
    case 2:
      return "Права и свободы";
    case 3:
      return "Государство/лоббизм";
  }
}

function devproject(data) {
  var key = [
    "feedback-to-feedback_ag-person_good-life_comment_1",
    "feedback-to-feedback_ag-person_good-life_comment_2",
    "feedback-to-feedback_ag-person_good-life_comment_3",
    "feedback-to-feedback_ag-person_well-being_comment_1",
    "feedback-to-feedback_ag-person_well-being_comment_2",
    "feedback-to-feedback_ag-person_well-being_comment_3",
    "feedback-to-feedback_inner-circle-ag_family_comment1",
    "feedback-to-feedback_inner-circle-ag_family_comment2",
    "feedback-to-feedback_inner-circle-ag_family_comment3",
    "feedback-to-feedback_inner-circle-ag_close-people_comment1",
    "feedback-to-feedback_inner-circle-ag_close-people_comment2",
    "feedback-to-feedback_inner-circle-ag_close-people_comment3",
    "feedback-to-feedback_inner-circle-ag_build-or-end_comment1",
    "feedback-to-feedback_inner-circle-ag_build-or-end_comment2",
    "feedback-to-feedback_inner-circle-ag_build-or-end_comment3",
    "feedback-to-feedback_ag-career_career_comment1",
    "feedback-to-feedback_ag-career_career_comment2",
    "feedback-to-feedback_ag-career_career_comment3",
    "feedback-to-feedback_ag-career_self-realization_comment1",
    "feedback-to-feedback_ag-career_self-realization_comment2",
    "feedback-to-feedback_ag-career_self-realization_comment3",
    "feedback-to-feedback_ag-society_personal-brand-development_comment1",
    "feedback-to-feedback_ag-society_personal-brand-development_comment2",
    "feedback-to-feedback_ag-society_personal-brand-development_comment3",
    "feedback-to-feedback_ag-society_fame_comment1",
    "feedback-to-feedback_ag-society_fame_comment2",
    "feedback-to-feedback_ag-society_fame_comment3",
    "feedback-to-feedback_ag-society_join-to-circle_comment",
    "feedback-to-feedback_ag-society_safety_comment",
  ];
  var val = [];
  for (var i = 0; i < key.length; ++i) {
    if (data[key[i]] != 0) {
      let v = vector(key[i], Number(data[key[i]]));
      val.push(v);
    }
  }
  for (var k = 0; k < val.length; ++k) {
    if (val[k][0] == "Личность") {
      let perdivElement = document.getElementById("project");
      let divElement = document.createElement("div");
      divElement.classList.add("how-it-works__text");
      divElement.innerText = val[k][2];
      perdivElement.appendChild(divElement);
      let div2Element = document.createElement("div");
      div2Element.classList.add("how-it-works__number");
      perdivElement.appendChild(div2Element);
      let div3Element = document.createElement("div");
      div3Element.classList.add("how-it-works__text");
      div3Element.innerText = val[k][1];
      perdivElement.appendChild(div3Element);
    } else if (val[k][0] == "Близкий круг") {
      let perdivElement = document.getElementById("project");
      let divElement = document.createElement("div");
      divElement.classList.add("how-it-works__text");
      divElement.innerText = val[k][2];
      perdivElement.appendChild(divElement);
      let div2Element = document.createElement("div");
      div2Element.classList.add("how-it-works__number");
      div2Element.classList.add("how-it-works__number_green");
      perdivElement.appendChild(div2Element);
      let div3Element = document.createElement("div");
      div3Element.classList.add("how-it-works__text");
      div3Element.innerText = val[k][1];
      perdivElement.appendChild(div3Element);
    } else if (val[k][0] == "Карьера") {
      let perdivElement = document.getElementById("project");
      let divElement = document.createElement("div");
      divElement.classList.add("how-it-works__text");
      divElement.innerText = val[k][2];
      perdivElement.appendChild(divElement);
      let div2Element = document.createElement("div");
      div2Element.classList.add("how-it-works__number");
      div2Element.classList.add("how-it-works__number_purple");
      perdivElement.appendChild(div2Element);
      let div3Element = document.createElement("div");
      div3Element.classList.add("how-it-works__text");
      div3Element.innerText = val[k][1];
      perdivElement.appendChild(div3Element);
    } else if (val[k][0] == "Общество") {
      let perdivElement = document.getElementById("project");
      let divElement = document.createElement("div");
      divElement.classList.add("how-it-works__text");
      divElement.innerText = val[k][2];
      perdivElement.appendChild(divElement);
      let div2Element = document.createElement("div");
      div2Element.classList.add("how-it-works__number");
      div2Element.classList.add("how-it-works__number_blue");
      perdivElement.appendChild(div2Element);
      let div3Element = document.createElement("div");
      div3Element.classList.add("how-it-works__text");
      div3Element.innerText = val[k][1];
      perdivElement.appendChild(div3Element);
    }
  }
}

function changeWidthValue(elementId, newValue) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.width = `${newValue}%`;
  }
}
/* ------------------------------------ */
function updateScale(westernValue) {
  // Убедитесь, что значение находится в диапазоне
  westernValue = Math.max(0, Math.min(100, westernValue));

  const easternValue = 100 - westernValue;

  document.getElementById("westernBar").style.width = `${westernValue}%`;
  document.getElementById("easternBar").style.width = `${easternValue}%`;

  document.getElementById("westernPercent").textContent = `${westernValue}%`;
  document.getElementById("easternPercent").textContent = `${easternValue}%`;
}

document.getElementById("westernValue").addEventListener("input", function () {
  const westernValue = parseInt(this.value) || 0; // Используйте || 0 для обработки NaN
  updateScale(westernValue);
});

const initialWesternValue = parseInt(document.getElementById("westernValue").value) || 0;
updateScale(initialWesternValue);
