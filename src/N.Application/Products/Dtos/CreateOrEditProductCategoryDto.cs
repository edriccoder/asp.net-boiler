using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Products.Dtos
{
    public class CreateOrEditProductCategoryDto: Entity <Guid?>
    {
        public  string Name { get; set; }
        public  string Description { get; set; }
        public  string ExternalId { get; set; }
    }
}
