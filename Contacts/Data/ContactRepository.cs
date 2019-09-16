using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactContext context;

        public ContactRepository(ContactContext context)
        {
            this.context = context;
        }

        public bool SaveChanges()
        {
            // Only return success if at least one row was changed
            return (context.SaveChanges()) > 0;
        }

        public Contact Add(Contact contact)
        {
            context.Contacts.Add(contact);
            context.SaveChanges();
            return contact;
        }

        public bool Delete(int id)
        {
            var contact = context.Contacts.Find(id);
            if (contact != null)
            {
                context.Contacts.Remove(contact);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public Contact GetContact(int id)
        {
            var contact = context.Contacts
                .Include(c => c.Phones)
                .FirstOrDefault(c => c.ContactId == id); 
      
            if (contact != null)
            {
                return contact;
            }
            return null;
        }

        public IEnumerable<Contact> GetContacts()
        {
            IQueryable<Contact> query = context.Contacts
            .Include(c => c.Phones);

            return query.OrderBy(c => c.ContactId);
        }


        public Contact Update(Contact contact)
        {
           
            var oldContact = this.GetContact(contact.ContactId);
            oldContact.Name = contact.Name;
            oldContact.Address = contact.Address;
            oldContact.Email = contact.Email;
            context.Update(oldContact);

            // Set manually detached to prevent tracking error
            foreach (var phone in contact.Phones)
            {
                context.Entry(phone).State = EntityState.Detached;
            }

            // Add or Update phones
            foreach (var phone in contact.Phones)
            {
                var oldPhone = context.Phones
                    .SingleOrDefault(p => p.PhoneId == phone.PhoneId);
                if (oldPhone != null)
                {
                    oldPhone.Type = phone.Type;
                    oldPhone.Number = phone.Number;
                    context.Update(oldPhone);
                } else
                {
                    phone.Contact = contact;
                    context.Add(phone);
                }
            }

            // Delete phones
            foreach (var phone in oldContact.Phones)
            {
                var exist = contact.Phones.Any(p => p.PhoneId == phone.PhoneId);
                if (!exist)
                {
                    context.Remove(phone);
                }
            }
                

            if (context.SaveChanges() > 0)
            {
                return contact;
            }
            return null;
        }
    }
}



            //foreach (var phone in contact.Phones)
            //{
            //    context.Phones.Attach(phone);
            //    context.Entry(phone).State = EntityState.Modified;
            //}