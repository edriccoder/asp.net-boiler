using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using N.Products;

namespace N.Carts
{
    [Table("CartItems")]
    public class CartItem : FullAuditedEntity<Guid>
    {
        public virtual Guid ProductCategoryId { get; set; }
      
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual string ExternalId { get; set; }

        [ForeignKey("ProductCategoryId")]
        public virtual ProductCategory ProductCategory { get; set; }
    }
}
