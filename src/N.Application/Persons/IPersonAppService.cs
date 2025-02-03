using N.Persons.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Persons
{
    internal interface IPersonAppService
    {
        Task<int> CreateOrEdit(CreateOrEditPersonDto input);
        Task<List<CreateOrEditPersonDto>> GetAll();
        Task Delete(int id);
    }
}
