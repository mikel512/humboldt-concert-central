using Data.Services;
using fortress.core.Model;
using fortress.core.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.DAL
{
    public class CityRepository : ICityRepository
    {
        private DapperService context;
        public CityRepository(IConfiguration configuration)
        {
            this.context = new DapperService(configuration);
        }
        public IEnumerable<City> GetCities()
        {
            return context.ExecuteProcedureAsync<City>("GetAllCities").Result;
        }

        public City GetCityById(int id)
        {
            return context.ExecuteSingleProcedureAsync<City>("GetCityById", Pairing.Of("@id", id)).Result;
        }
    }
}
