using fortress.core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.DAL
{
    interface IVenueRepository
    {
        Task<IEnumerable<Venue>> GetVenues();
        //IEnumerable<Venue> GetVenuesByCity();
        Task<Venue> GetVenueById(int id);
        Task<IEnumerable<Venue>> GetVenuesByCity(string city);
        void InsertVenue(Venue venue);
        void DeleteVenue(int id);
        void UpdateVenue(Venue venue);

    }
}
