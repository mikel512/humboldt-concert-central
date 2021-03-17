using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.Model
{
    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string Image { get; set; }
        public IEnumerable<Venue> Venues { get; set; }
    }
}
