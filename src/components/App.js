import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './App.css';

import Header from './Header'
import ContactList from './ContactList'
import AddContact from './AddContact'
import ContactDetail from './ContactDetail'


function App() {
  const LOCAL_STORAGE_KEY = 'contacts'

  const [contacts, setContacts] = useState([])

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }])
  }
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })
    setContacts(newContactList)
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (retrieveContacts) {
      setContacts(retrieveContacts)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="ui container">
        <Header />
      <Routes>
        <Route path='/' element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
        <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />
        <Route path='/contact/:id' element={<ContactDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
