import { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(data);
      setError('');
    } catch (err) {
      setError('Failed to load contacts. Make sure the backend is running.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const addContact = (newContact) => {
    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = (deletedId) => {
    setContacts(prev => prev.filter(contact => contact._id !== deletedId));
  };

  return {
    contacts,
    loading,
    error,
    addContact,
    deleteContact
  };
};

