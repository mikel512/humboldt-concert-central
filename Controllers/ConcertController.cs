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
    [Route("[controller]")]
    [ApiController]
    public class ConcertController : ControllerBase
    {
        IConcertRepository concertRepository;

        public ConcertController(IConfiguration configuration)
        {
            this.concertRepository = new ConcertRepository(configuration);
        }
        // GET: /<ConcertController>
        [HttpGet]
        public Task<IEnumerable<EventConcert>> Get()
        {
            return concertRepository.GetConcerts();
            //return new string[] { "value1", "value2" };
        }

        // GET /<ConcertController>/5
        [HttpGet("{id}")]
        public Task<EventConcert> Get(int id)
        {
            return concertRepository.GetConcertById(id);
        }

        [HttpGet("city/{city}")]
        public Task<IEnumerable<EventConcert>> Get(string city)
        {
            return concertRepository.GetConcertsByCity(city);
        }

        [HttpGet("{venueId}/{isVenue}")]
        public Task<IEnumerable<EventConcert>> Get(int venueId, bool isVenue)
        {
            return concertRepository.GetConcertsByVenue(venueId);
        }

        // POST /<ConcertController>
        [HttpPost]
        public void Post(EventConcert concert)
        {
            concertRepository.InsertConcert(concert);
        }

        // PUT /<ConcertController>/5
        [HttpPut("{id}")]
        public void Put(EventConcert concert)
        {
            concertRepository.UpdateConcert(concert);
        }

        // DELETE /<ConcertController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            concertRepository.DeleteConcert(id);
        }
    }
}
