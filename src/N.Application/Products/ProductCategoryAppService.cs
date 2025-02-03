using N.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace N.Products
{
    public class ProductCategoryAppService : NAppServiceBase, IProductCategoryAppService
    {
        private readonly IRepository<ProductCategory, Guid> _productCategoryRespository;

        public ProductCategoryAppService(IRepository<ProductCategory, Guid> productCategoryRepo)
        {
            this._productCategoryRespository = productCategoryRepo;
        }

        public async Task<Guid> CreateOrEdit(CreateOrEditProductCategoryDto input)
        {
            if(input.Id==null)
            {
                //var productCategory = new ProductCategory()
                //{
                //    Name = input.Name,
                //    Description = input.Description,
                //    ExternalId = input.ExternalId
                //};

                var productCategory = this.ObjectMapper.Map<ProductCategory>(input);
                return await this._productCategoryRespository.InsertAndGetIdAsync(productCategory);
            } else
            {
                var productCategory = await this._productCategoryRespository.FirstOrDefaultAsync(input.Id.Value);

                //productCategory.Name = input.Name;
                //productCategory.Description = input.Description;
                //productCategory.ExternalId = input.ExternalId; 

                this.ObjectMapper.Map(input, productCategory);
                return productCategory.Id;

            }
            return new Guid();

        }

        public async Task Delete(Guid id)
        {
            await this._productCategoryRespository.DeleteAsync(id);

        }

        public async Task<CreateOrEditProductCategoryDto> GetProductCategoryDto(Guid id)
        {
            var productCategory = await this._productCategoryRespository.FirstOrDefaultAsync(id);
            //return new CreateOrEditProductCategoryDto
            //{
            //    Name = productCategory.Name,
            //    Description = productCategory.Description,
            //    ExternalId = productCategory.ExternalId
            //};

            return this.ObjectMapper.Map<CreateOrEditProductCategoryDto>(productCategory);

        }

        public async Task<List<CreateOrEditProductCategoryDto>> GetAll()
        {
            var productCategories = await this._productCategoryRespository.GetAll().ToListAsync();
            
            var results = new  List<CreateOrEditProductCategoryDto>();

            foreach(var productCategory in productCategories)
            {
                results.Add(this.ObjectMapper.Map<CreateOrEditProductCategoryDto>(productCategory));

            }
            return results;
        }
    }
}
