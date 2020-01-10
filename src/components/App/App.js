import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import styles from './App.module.css';
import slideLeftAppear from './transition/slideLeftAppear.module.css';
import fideTransition from './transition/fide.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = obj => {
    const isResult = contacts.filter(
      contact =>
        contact.name.toLocaleLowerCase() === obj.name.toLocaleLowerCase(),
    );

    if (isResult.length > 0) {
      toast.error('Сontact exists!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      setContacts(prevContacts => [obj, ...prevContacts]);
    }
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    const data = localStorage.getItem('contacts');

    if (data) {
      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };

  const filteredFriends = contacts.filter(friend =>
    friend.name.toLocaleLowerCase().includes(filter),
  );

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <CSSTransition in timeout={500} classNames={slideLeftAppear} appear>
        <h1 className={styles.logo}>Phonebook</h1>
      </CSSTransition>
      <ContactForm onSubmitContact={addContact} />

      <CSSTransition
        in={contacts.length > 1}
        timeout={250}
        classNames={fideTransition}
        unmountOnExit
      >
        <Filter filter={filter} onFilterChange={handleFilterChange} />
      </CSSTransition>

      {contacts.length > 0 && (
        <ContactList contacts={filteredFriends} onDelete={deleteContact} />
      )}
    </div>
  );
};

export default App;
