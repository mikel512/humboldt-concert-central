using fortress.core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.DAL
{
    interface IConcertRepository
    {
        Task<IEnumerable<EventConcert>> GetConcerts();
        Task<IEnumerable<EventConcert>> GetConcertsByCity(string city);
        Task<IEnumerable<EventConcert>> GetConcertsByVenue(int venueId);
        Task<EventConcert> GetConcertById(int id);
        void InsertConcert(EventConcert concert);
        void DeleteConcert(int id);
        void UpdateConcert(EventConcert concert);
        //void Save();
    }
}
