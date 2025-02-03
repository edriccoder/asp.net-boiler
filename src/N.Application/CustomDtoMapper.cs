using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using N.Persons;
using N.Persons.Dto;
using N.Products;
using N.Products.Dtos;

namespace N
{
    internal class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<CreateOrEditProductCategoryDto, ProductCategory>().ReverseMap();

            configuration.CreateMap<CreateOrEditPersonDto, Person>().ReverseMap();
        }
    }
}
