using fortress.core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.DAL
{
    interface ICityRepository
    {
        IEnumerable<City> GetCities();
        City GetCityById(int id);
    }
}
