function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');

let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

function addContact(contact) {
  if (contacts.length === 0) {
    contactsTable.innerHTML = '';
  }

  contacts.push(contact);

  const row = contactsTable.insertRow();

  const firstCell = row.insertCell();
  const lastCell = row.insertCell();
  const emailCell = row.insertCell();
  const phoneCell = row.insertCell();
  const deleteCell = row.insertCell();

  firstCell.textContent = contact.first;
  lastCell.textContent = contact.last;
  emailCell.textContent = contact.email;
  phoneCell.textContent = contact.phone;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  deleteCell.appendChild(deleteButton);

  click(deleteButton, () => {
    row.remove();

    contacts = contacts.filter(c => c !== contact);
  });
}

fetch('./contacts.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not load contacts.json');
    }

    return response.json();
  })
  .then(data => {
    data.forEach(contact => {
      addContact(contact);
    });
  })
  .catch(error => {
    console.error('Error loading contacts:', error);
  });

on(addContactForm, 'submit', e => {
  e.preventDefault();

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  addContact(newContact);
  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);