using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Cart.Dtos
{
    public class AddToCartDto
    {
        [Required]
        public Guid ProductCategoryId { get; set; }
    }
}
