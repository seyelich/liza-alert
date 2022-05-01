// ============================
// Объявляем константы DOM
// ============================

const hideButtons = document.querySelectorAll('.filters__hide-button');
const filterLevelCheckboxes = document.querySelectorAll('.filters__input_type_level');
const filterStatusCheckboxes = document.querySelectorAll('.filters__input_type_status');
const selectedItems = document.querySelectorAll('.filters__selected-item');
const selectedItemsButtons = document.querySelectorAll('.filters__remove-button');
const filterResetButton = document.querySelector('.filters__reset-button');
const cardsContainer = document.querySelector('.courses-cards');

// ============================
// Объект для работы фильтров
// ============================
const filters = {
  level: {
    beginner: false,
    experienced: false,
    professional: false,
    get isActive() {
      return (this.beginner || this.experienced || this.professional);
    }
  },

  status: {
    disable: false,
    recorded: false,
    active: false,
    complited: false,
    get isActive() {
    return (this.disable || this.recorded || this.active || this.complited);
    }
  },

  get isActive() {
    return (this.level.isActive || this.status.isActive);
  }
}



// ============================
// Объявляем функции работы фильтров
// ============================
// Установка значения фильтра
function setFilter(type, filter, value) {
  filters[type][filter] = value;
  if (value && filter === 'disable') filters.status['active'] = false;
  if (value && filter === 'active') filters.status['disable'] = false;
  renderFilters();
}

// Отображение активных фильтров на странице
function renderFilters() {
  for (const checkbox of filterLevelCheckboxes) {
    checkbox.checked = filters.level[checkbox.id];
  }
  for (const checkbox of filterStatusCheckboxes) {
    checkbox.checked = filters.status[checkbox.id];
  }
  for (item of selectedItems) {
    const id = item.id.slice(5);
    if (filters.level[id]) {
      item.classList.remove('filters__selected-item_hidden');
    } else {
      item.classList.add('filters__selected-item_hidden');
    }
  }
}

// Сброс всех фильтров
function resetFilters(filters) {
  for (const filter in filters.level) filters.level[filter] = false;
  for (const filter in filters.status) filters.status[filter] = false;
  renderFilters();
}

// Проверка карточки на соответствие фильтру
function checkFilter (card, type) {
  if (!filters[type].isActive) return true;
  const filteredClasses = [];
  for (const filter in filters[type]) {
    if (filters[type][filter]) filteredClasses.push('course-card_' + type + '_' + filter);
  }
  for (const className of filteredClasses) {
    if (card.classList.contains(className)) return true;
  }
  return false;
}

// Применение фильтров к отображению карточек
function applyFilters(filters) {
  if (!filters.isActive) {
    for (const card of courseCards) card.classList.remove('course-card_hidden');
  } else {
    for (const card of courseCards) {
      if (checkFilter(card, 'level') && checkFilter(card, 'status')) {
        card.classList.remove('course-card_hidden');
      } else {
        card.classList.add('course-card_hidden');
      }
    }
  }
}

// ============================
// Объявляем функции карточек курсов
// ============================
// Создание карточки
function createCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue, cardStatusValue) {
  const cardTemplate = document.querySelector('#course-card-template').content;
  const cardEl = cardTemplate.querySelector('.course-card').cloneNode(true);
  const cardImg = cardEl.querySelector('.course-card__img');
  const cardMainInfo = cardEl.querySelector('.course-card__main-info');
  const cardAddInfo = cardEl.querySelector('.course-card__add-info');
  const cardTitle = cardMainInfo.querySelector('.course-card__title');
  const cardLvl = cardMainInfo.querySelector('.course-card__lvl');
  const cardDescription = cardMainInfo.querySelector('.course-card__description');
  const cardButton = cardAddInfo.querySelector('.course-card__button');
  cardEl.classList.add('course-card_level_' + cardLvlValue, 'course-card_status_' + cardStatusValue);
  cardImg.src = cardLinkValue;
  cardImg.alt = cardNameValue;
  cardTitle.textContent = cardNameValue;
  switch (cardLvlValue) {
    case 'professional':
      cardLvl.textContent = 'Профессионал';
      break;
    case 'experienced':
      cardLvl.textContent = 'Бывалый';
      break;
    default:
      cardLvl.textContent = 'Новичок';
  }
  cardDescription.textContent = cardTextValue;

  switch (cardStatusValue) {
    case 'active':
      cardButton.classList.add('button_type_active-white');
      cardButton.textContent = 'Записаться';
      cardButton.addEventListener('click', (evt) => {
        evt.target.classList.remove('button_type_active-white');
        evt.target.classList.add('button_type_active-orange');
        evt.target.textContent = 'Продолжить';
        evt.target.parentElement.parentElement.classList.add('course-card_status_recorded');
        evt.target.parentElement.parentElement.classList.remove('course-card_status_active');
        applyFilters(filters);
      });
      break;
    case 'recorded':
      cardButton.classList.remove('button_type_active-white');
      cardButton.classList.add('button_type_active-orange');
      cardButton.textContent = 'Продолжить';
      break;
    case 'complited':
      cardButton.classList.add('button_type_disabled');
      cardButton.textContent = 'Пройден';
      cardButton.disabled = true;
  }

  return cardEl;
}

// Добавление карточки
function addCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue, cardStatusValue) {
  const cardEl = createCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue, cardStatusValue);
  cardsContainer.append(cardEl);
}



// ============================
// Навешиваем обработчики событий
// ============================
// Кнопка сворачивания фильтра
hideButtons.forEach(item => {
  item.addEventListener('click', function (event) {
    if (!event.target.hasAttribute('aria-label')) {
      event.target.parentElement.lastElementChild.classList.toggle('filters__hide-icon_opened');
      event.target.parentElement.nextElementSibling.classList.toggle('filters__checkboxes_opened');
    }
    else {
      event.target.lastElementChild.classList.toggle('filters__hide-icon_opened');
      event.target.nextElementSibling.classList.toggle('filters__checkboxes_opened');
    }
  })
})

// Кнопка сброса фильтров
filterResetButton.addEventListener('click', function () {
  resetFilters(filters);
  applyFilters(filters);
})

// Чекбоксы фильтров по уровню
filterLevelCheckboxes.forEach(item => {
  item.addEventListener('click', function (event) {
    const checkbox = event.target;
    setFilter('level', checkbox.id, checkbox.checked);
    applyFilters(filters);
  })
})

// Чекбоксы фильтров по статусу
filterStatusCheckboxes.forEach(item => {
  item.addEventListener('click', function (event) {
    const checkbox = event.target;
    setFilter('status', checkbox.id, checkbox.checked);
    applyFilters(filters);
  })
})

// Кнопки удаления фильтров по уровню
selectedItemsButtons.forEach(item => {
  item.addEventListener('click', function (event) {
    const id = event.target.parentElement.id.slice(5);
    setFilter('level', id, false);
    applyFilters(filters);
  })
})



// ============================
// Населяем карточки при загрузке страницы
// ============================
initialCards.forEach((i) => { addCard(i.name, i.link, i.lvl, i.text, i.status) });
const courseCards = document.querySelectorAll('.course-card');
