using AutoMapper;
using Contacts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Data
{
    public class ContactProfile: Profile
    {
        public ContactProfile()
        {
            this.CreateMap<Contact, ContactModel>()
                .ReverseMap();
                //.ForMember(t => t.Phones, opt => opt.MapFrom(src => src.Phones));

            this.CreateMap<Phone, PhoneModel>()
                .ReverseMap()
                .ForMember(t => t.Contact, opt => opt.Ignore());
        }

        //private void AddOrUpdateCities(CountryData dto, Country country)
        //{
        //    foreach (var cityDTO in dto.Cities)
        //    {
        //        if (cityDTO.Id == 0)
        //        {
        //            country.Cities.Add(Mapper.Map<City>(cityDTO));
        //        }
        //        else
        //        {
        //            Mapper.Map(cityDTO, country.Cities.SingleOrDefault(c => c.Id == cityDTO.Id));
        //        }
        //    }
        }
    }
