using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using N.Products.Dtos;

namespace N.Products
{
    internal interface IProductCategoryAppService
    {
        Task<Guid> CreateOrEdit(CreateOrEditProductCategoryDto input);

        Task Delete(Guid id);

        Task<CreateOrEditProductCategoryDto> GetProductCategoryDto(Guid id);
        Task<List<CreateOrEditProductCategoryDto>> GetAll();

    }
}
