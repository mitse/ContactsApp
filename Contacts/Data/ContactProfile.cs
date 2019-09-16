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

        //private void AddOrUpdateCities(Contact dto, ContactModel contact)
        //{
        //    foreach (var phoneDTO in dto.Phones)
        //    {
        //        if (phoneDTO.PhoneId == 0)
        //        {
        //            contact.Phones.Add(Mapper.Map<PhoneModel>(phoneDTO));
        //        }
        //        else
        //        {

        //            AutoMapper.Mapper.Map(phoneDTO, contact.Phones.SingleOrDefault(p => p.PhoneId == phoneDTO.PhoneId));
        //        }
        //    }
        //}
    }
}
