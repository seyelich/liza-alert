const hideButtons = document.querySelectorAll('.filters__hide-button');

hideButtons.forEach(item => {
  item.addEventListener('click', function (event) {
    if (!event.target.hasAttribute('area-label')) {
      event.target.parentElement.lastElementChild.classList.toggle('filters__hide-icon_opened');
      event.target.parentElement.nextElementSibling.classList.toggle('filters__checkboxes_opened');
    }
    else {
      event.target.lastElementChild.classList.toggle('filters__hide-icon_opened');
      event.target.nextElementSibling.classList.toggle('filters__checkboxes_opened');
    }
  })
})
