const hideButtons = document.querySelectorAll('.filters__hide-button');

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

const cardsContainer = document.querySelector('.courses-cards');

const initialCards = [
  {
    link: 'images/img-1.png',
    name: 'Кинологическое направление',
    lvl: 'Бывалый',
    text: 'Поисково-спасательная работа, следовая работа, а так же поиск тел погибших с помощью собак'
  },

  {
    link: 'images/img-2.png',
    name: 'Оперативные дежурные',
    lvl: 'Профессионал',
    text: 'Оперативное реагирование, контроль поступающих заявок и звонков, распределение задач, помощь в решении вопросов, удалённое ...'
  },

  {
    link: 'images/img-3.png',
    name: 'Беспилотные летательные аппараты',
    lvl: 'Бывалый',
    text: 'Применение БПЛА в поиске людей, а так же передача полученной с помощью техники информации спасательным службам'
  },

  {
    link: 'images/img-4.png',
    name: 'Первая помощь',
    lvl: 'Бывалый',
    text: 'Основы оказания первой помощи на поиске, юридические аспекты, базовые алгоритмы, разбор ошибок при оказания помощи на поиске'
  },

  {
    link: 'images/img-5.png',
    name: 'Инфогруппа',
    lvl: 'Новичок',
    text: 'Создание ориентировок, заказ карт, связь через мини АТС, обеспечение поиска'
  },

  {
    link: 'images/img-6.png',
    name: 'Операторы 8-800',
    lvl: 'Новичок',
    text: 'Приём заявок на поиск людей с последующей передачей информации инфоргам'
  },

  {
    link: 'images/img-7.png',
    name: 'Группа коротких прозвонов',
    lvl: 'Новичок',
    text: 'Прозвон больниц, ОВД, различных ведомств, иногда свидетелей и возможных свидетелей'
  },

  {
    link: 'images/img-8.png',
    name: 'Новичковая',
    lvl: 'Новичок',
    text: 'Короткое описание курса. людей в лесу и в городе.Все поисковые мероприятия организуются силами добровольцев «ЛизаАлер...'
  }
];

function createCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue) {
  const cardTemplate = document.querySelector('#course-card-template').content;
  const cardEl = cardTemplate.querySelector('.course-card').cloneNode(true);
  const cardImg = cardEl.querySelector('.course-card__img');
  const cardMainInfo = cardEl.querySelector('.course-card__main-info');
  const cardAddInfo = cardEl.querySelector('.course-card__add-info');
  const cardTitle = cardMainInfo.querySelector('.course-card__title');
  const cardLvl = cardMainInfo.querySelector('.course-card__lvl');
  const cardDescription = cardMainInfo.querySelector('.course-card__description');
  const cardButton = cardAddInfo.querySelector('.course-card__button');
  cardImg.src = cardLinkValue;
  cardImg.alt = cardNameValue;
  cardTitle.textContent = cardNameValue;
  cardLvl.textContent = cardLvlValue;
  cardDescription.textContent = cardTextValue;

  cardButton.addEventListener('click', (evt) => {
    evt.target.classList.remove('button_type_active-white');
    evt.target.classList.add('button_type_active-orange');
    evt.target.textContent = 'Продолжить';
  });

  if (cardNameValue === 'Инфогруппа' || cardNameValue === 'Новичковая') {
    cardButton.disabled = true;
    cardButton.textContent = 'Пройден';
    cardButton.classList.remove('button_type_active-white');
    cardButton.classList.add('button_type_disabled');
  }

  return cardEl;
}

function addCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue) {
  const cardEl = createCard(cardNameValue, cardLinkValue, cardLvlValue, cardTextValue);
  cardsContainer.append(cardEl);
}

initialCards.forEach((i) => { addCard(i.name, i.link, i.lvl, i.text) });
