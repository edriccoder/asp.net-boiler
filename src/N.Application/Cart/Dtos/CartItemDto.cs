using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace N.Cart.Dtos
{
    public class CartItemDto : Entity<Guid>
    {
        public Guid ProductCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ExternalId { get; set; }
    }
}
