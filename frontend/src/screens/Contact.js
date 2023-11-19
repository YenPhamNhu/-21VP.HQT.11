import React from 'react';

const Contact = () => {
  return (
    <main>
      <h2>Contact Us</h2>
      <p>
        Please feel free to contact us using the form below.
      </p>
      <form>
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Message:</label>
        <textarea name="message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Contact;
