using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Persons.Dto
{
    public class CreateOrEditPersonDto: Entity <int>
    {
        
        
        public string Name { get; set; }
  
        public  string Surname { get; set; }
        public virtual string EmailAddress { get; set; }
    }
}

