using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.Model
{
    public class Venue
    {
        public int VenueId { get; set; }
        public string VenueName { get; set; }
        public string Location { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public string Logo { get; set; }
        public string TicketsLink { get; set; }
        public string MenuLink { get; set; }
        public string Hours { get; set; }
        public City City { get; set; }
        public IEnumerable<EventConcert> EventConcerts { get; set; }

    }
}
