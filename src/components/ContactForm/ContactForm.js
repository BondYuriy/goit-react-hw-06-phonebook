import React, { useState } from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onSubmitContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputId = { inputName: v4(), inputNumber: v4() };

  const updaeName = ({ target }) => {
    setName(target.value);
  };

  const updaeNumber = ({ target }) => {
    setNumber(target.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const submitForm = evt => {
    evt.preventDefault();

    /* id - только для работы функционала */
    const id = v4();
    onSubmitContact({ name, number, id });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <label className={styles.label} htmlFor={inputId.inputName}>
        <p>Name</p>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={updaeName}
          id={inputId.inputName}
        />
      </label>
      <label className={styles.label} htmlFor={inputId.inputNumber}>
        <p>Number</p>
        <input
          className={styles.input}
          type="text"
          name="number"
          value={number}
          onChange={updaeNumber}
          id={inputId.inputNumber}
        />
      </label>
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmitContact: PropTypes.func.isRequired,
};

export default ContactForm;
