using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contacts.Data;
using Contacts.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository repository;
        private readonly IMapper mapper;

        public ContactsController(IContactRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        // GET api/contacts
        [HttpGet]
        public ActionResult<ContactModel[]> Get()
        {
            try
            {
                var results = repository.GetContacts();
                var contacts = mapper.Map<ContactModel[]>(results);
                return contacts;
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }
        }

        // GET api/contacts/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "contact";
        }

        // POST api/contacts
        [HttpPost]
        public ActionResult<ContactModel> Post(ContactModel model)
        {
            try
            {
                var contact = mapper.Map<Contact>(model);
                repository.Add(contact);
                return Created("", mapper.Map<ContactModel>(contact));
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Error");
            }

        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public ActionResult<ContactModel> Put(int id, ContactModel model)
        {
            try
            {
                var oldContact = repository.GetContact(id);
                if (oldContact == null) return NotFound($"Could not find contact");

                //var updated = mapper.Map(model, oldContact);
                //if(repository.SaveChanges())
                //{
                //    return mapper.Map<ContactModel>(updated);
                //}

                var updated =  repository.Update(mapper.Map<Contact>(model));
                return mapper.Map<ContactModel>(updated);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
            return BadRequest();
        }

        // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = repository.Delete(id);
                if (!result) return NotFound();

                return Ok();
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

        }
    }
}
