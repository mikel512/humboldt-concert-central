using fortress.core.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fortress.core.DAL;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fortress_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        ICityRepository cityRepository;

        public CityController(IConfiguration configuration)
        {
            this.cityRepository = new CityRepository(configuration);
        }
        // GET: api/<CityController>
        [HttpGet]
        public IEnumerable<City> Get()
        {
            return cityRepository.GetCities();
        }

        // GET <CityController>/5
        [HttpGet("{id}")]
        public City Get(int id)
        {
            return cityRepository.GetCityById(id);
        }

        // POST <CityController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<CityController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<CityController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
