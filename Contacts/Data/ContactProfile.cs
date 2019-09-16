using AutoMapper;
using Contacts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Data
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            this.CreateMap<Contact, ContactModel>()
              .ForMember(c => c.Phones, o => o.MapFrom(c => c.Phones))
              .ReverseMap();

            this.CreateMap<Phone, PhoneModel>()
                .ReverseMap()
                .ForMember(t => t.Contact, opt => opt.Ignore());
        }

    }
}
