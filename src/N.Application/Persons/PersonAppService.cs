using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using N.Persons.Dto;
using N.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Persons
{
    public class PersonAppService: NAppServiceBase, IPersonAppService
    {
        private readonly IRepository<Person> _personCatergoryResoisitory;

        public PersonAppService(
            IRepository<Person> personCatergoryResoisitory)
        {
            _personCatergoryResoisitory = personCatergoryResoisitory;
        }

        public async Task<int> CreateOrEdit(CreateOrEditPersonDto input)  
        {
            if (input.Id == 0)
            {
                return await this.Create(input);
            }
            else
            {
                return await this.Update(input);
            }
        }
        private async Task<int> Create(CreateOrEditPersonDto input)
        {
            var person = this.ObjectMapper.Map<Person>(input);
            return await _personCatergoryResoisitory.InsertAndGetIdAsync(person);
        }

        private async Task<int> Update(CreateOrEditPersonDto input)
        {
            var person = this.ObjectMapper.Map<Person>(input);
            return await _personCatergoryResoisitory.InsertOrUpdateAndGetIdAsync(person);
        }

        public async Task<List<CreateOrEditPersonDto>> GetAll()
        {
            var results = new List<CreateOrEditPersonDto>();
            var persons = await _personCatergoryResoisitory.GetAll().ToListAsync();

            foreach (var person in persons)
            {
                results.Add(this.ObjectMapper.Map<CreateOrEditPersonDto>(person));

            }
             return results;


        }

        public async Task Delete(int id)
        {
            await _personCatergoryResoisitory.DeleteAsync(id);
        }

    }
}
