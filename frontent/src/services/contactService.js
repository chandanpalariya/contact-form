import API_URL from '../config/api.js';

export const contactService = {
  async getAll() {
    const response = await fetch(`${API_URL}/api/contacts`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    
    return response.json();
  },

  async create(contactData) {
    const response = await fetch(`${API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (!response.ok) {
      throw new Error('Failed to create contact');
    }

    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/api/contacts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }

    return response.json();
  }
};

