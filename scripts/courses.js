const filters = {
  beginner: false,
  experienced: false,
  professional: false,
  disable: false,
  recorded: false,
  active: false,
  complited: false
}

const hideButtons = document.querySelectorAll('.filters__hide-button');
const filterCheckboxes = document.querySelectorAll('.filters__input');
const selectedItems = document.querySelectorAll('.filters__selected-item');
const selectedItemsButtons = document.querySelectorAll('.filters__remove-button');
const filterResetButton = document.querySelector('.filters__reset-button');


function filtersAreActive (filters) {
  for (filter in filters) {
    if (filters[filter] === true) return true;
  }
  return false;
}

function setFilter (filters, filter, value) {
  filters[filter] = value;
  if (value && filter === 'disable') filters['active'] = false;
  if (value && filter === 'active') filters['disable'] = false;
}

function resetFilters (filters) {
  for (filter in filters) filters[filter] = false;
}

function applyFilters (filters) {
  for (checkbox of filterCheckboxes) {
    checkbox.checked = filters[checkbox.id];
  }
  for (item of selectedItems) {
    const id = item.id.slice(5);
    if (filters[id]) {
      item.classList.remove('filters__selected-item_hidden');
    } else {
      item.classList.add('filters__selected-item_hidden');
    }
  }
}



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

filterResetButton.addEventListener('click', function (event) {
  resetFilters(filters);
  applyFilters(filters);
})

filterCheckboxes.forEach(item => {
  item.addEventListener('click', function (event) {
    const checkbox = event.target;
    setFilter(filters, checkbox.id, checkbox.checked);
    applyFilters(filters);
  })
})

selectedItemsButtons.forEach(item => {
  item.addEventListener('click', function (event) {
    const id = event.target.parentElement.id.slice(5);
    setFilter(filters, id, false);
    applyFilters(filters);
  })
})
