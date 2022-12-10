const argv = require('yargs').argv;
const { getContactById, listContacts, addContact, removeContact } = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          const contacts = await listContacts();
          console.log(contacts)
      break;

      case "get":
          const contactById = await getContactById(id);
          console.log(contactById)
      break;

      case "add":
          const addNewContact = await addContact(name, email, phone);
          console.log(addNewContact)
        break;

      case "remove":
          const deleteContact = await removeContact(String(id));
          console.log(deleteContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);