using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Data
{
    public interface IContactRepository
    {
        bool SaveChanges();
        Contact GetContact(int Id);
        IEnumerable<Contact> GetContacts();
        Contact Add(Contact contact);
        Contact Update(Contact contact);
        bool Delete(int id);

    }
}
