const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    let contacts = JSON.parse(response);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id == contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
      contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}