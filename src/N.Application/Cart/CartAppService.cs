using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using N.Carts;
using N.Cart.Dtos;
using Abp.Domain.Repositories;
using N.Products;

namespace N.Cart
{
    public class CartAppService : NAppServiceBase, ICartAppService
    {
        private readonly IRepository<CartItem, Guid> _cartRepository;
        private readonly IRepository<ProductCategory, Guid> _productCategoryRepository;

        public CartAppService(IRepository<CartItem, Guid> cartRepository, IRepository<ProductCategory, Guid> productCategoryRepository)
        {
            _cartRepository = cartRepository;
            _productCategoryRepository = productCategoryRepository;
        }

        public async Task<CartItemDto> AddToCart(AddToCartDto input)
        {
            var product = await _productCategoryRepository.GetAsync(input.ProductCategoryId);

            var cartItem = new CartItem
            {
                ProductCategoryId = product.Id,
                Name = product.Name,
                Description = product.Description,
                ExternalId = product.ExternalId
            };

            var insertedItem = await _cartRepository.InsertAsync(cartItem);
            return ObjectMapper.Map<CartItemDto>(insertedItem);
        }
    }
}
