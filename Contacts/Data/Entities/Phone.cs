using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contacts.Data
{
    public class Phone
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PhoneId { get; set; }
        public Contact Contact { get; set; }

        public string Type { get; set; }

        public string Number { get; set; }
    }
}
