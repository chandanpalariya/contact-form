import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { useContacts } from './hooks/useContacts';

function App() {
  const { contacts, loading, error, addContact, deleteContact } = useContacts();

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Get in touch with us. We'd love to hear from you.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <section className="mb-8 sm:mb-10 md:mb-12">
          <ContactForm onContactAdded={addContact} />
        </section>

        <section>
          {loading ? (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm text-center border border-gray-200">
              <p className="text-gray-500">Loading contacts...</p>
            </div>
          ) : (
            <ContactList 
              contacts={contacts} 
              onContactDeleted={deleteContact} 
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
