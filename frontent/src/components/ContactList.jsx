import { useState, useMemo } from 'react';
import { contactService } from '../services/contactService';

function ContactList({ contacts, onContactDeleted }) {
  const [deletingId, setDeletingId] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    setDeletingId(id);

    try {
      await contactService.delete(id);
      onContactDeleted(id);
    } catch (error) {
      alert('Failed to delete contact. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sortedContacts = useMemo(() => {
    if (sortBy === 'default') {
      return contacts;
    }
    
    const contactsCopy = [...contacts];
    
    switch (sortBy) {
      case 'name-asc':
        return contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return contactsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return contactsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return contactsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'email-asc':
        return contactsCopy.sort((a, b) => {
          const emailA = a.email || '';
          const emailB = b.email || '';
          return emailA.localeCompare(emailB);
        });
      default:
        return contacts;
    }
  }, [contacts, sortBy]);

  if (contacts.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Contacts</h2>
        <p className="text-gray-500 text-sm sm:text-base">No contacts yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Contacts <span className="text-blue-600">({contacts.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-400 transition-colors"
          >
            <option value="default">No Sorting</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="email-asc">Email (A-Z)</option>
          </select>
        </div>
      </div>
      
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.name}
                </td>
                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-sm text-gray-500">
                  {contact.email || '-'}
                </td>
                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-sm text-gray-500">
                  {contact.phone}
                </td>
                <td className="px-3 md:px-4 py-2 md:py-3 text-sm text-gray-500 max-w-xs truncate">
                  {contact.message || '-'}
                </td>
                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {formatDate(contact.createdAt)}
                </td>
                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    disabled={deletingId === contact._id}
                    className={`text-red-600 hover:text-red-800 font-medium transition-colors ${
                      deletingId === contact._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {deletingId === contact._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sortedContacts.map((contact) => (
          <div key={contact._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{contact.name}</h3>
              <button
                onClick={() => handleDelete(contact._id)}
                disabled={deletingId === contact._id}
                className={`text-red-600 hover:text-red-800 text-sm font-medium transition-colors ${
                  deletingId === contact._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deletingId === contact._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              {contact.email && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-16">Email:</span>
                  <span className="text-gray-700 flex-1 break-words">{contact.email}</span>
                </div>
              )}
              <div className="flex items-start">
                <span className="font-medium text-gray-600 w-16">Phone:</span>
                <span className="text-gray-700 flex-1 break-words">{contact.phone}</span>
              </div>
              {contact.message && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-16">Message:</span>
                  <span className="text-gray-700 flex-1 break-words">{contact.message}</span>
                </div>
              )}
              <div className="flex items-start pt-1 border-t border-gray-200">
                <span className="font-medium text-gray-600 w-16">Created:</span>
                <span className="text-gray-500 text-xs flex-1">{formatDate(contact.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;

