using fortress.core.DAL;
using fortress.core.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fortress.core.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class VenueController : ControllerBase
    {
        IVenueRepository repository;

        public VenueController(IConfiguration configuration)
        {
            this.repository = new VenueRepository(configuration);
        }
        // GET: api/<VenueController>
        [HttpGet]
        public Task<IEnumerable<Venue>> Get()
        {
            return repository.GetVenues();

        }

        // GET: api/<VenueController>
        [HttpGet("city/{city}")]
        public Task<IEnumerable<Venue>> Get(string city)
        {
            return repository.GetVenuesByCity(city);

        }


        // GET api/<VenueController>/5
        [HttpGet("{id}")]
        public Task<Venue> Get(int id)
        {
            return repository.GetVenueById(id);
        }

        // POST api/<VenueController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<VenueController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VenueController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
