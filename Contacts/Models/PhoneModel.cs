using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Models
{
    public class PhoneModel
    {
        public int PhoneId { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]{10}$")]
        public string Number { get; set; }
    }
}
