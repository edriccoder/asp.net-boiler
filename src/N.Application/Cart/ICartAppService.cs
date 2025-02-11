using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using N.Cart.Dtos;

namespace N.Cart
{
    public interface ICartAppService
    {
        Task<CartItemDto> AddToCart(AddToCartDto input);
    }
}
