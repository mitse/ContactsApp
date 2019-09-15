﻿using System;
using System.Collections.Generic;


namespace Contacts.Data
{
    public class Contact
    {
        public int ContactId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public ICollection<Phone> Phones { get; set; }
    }
}
