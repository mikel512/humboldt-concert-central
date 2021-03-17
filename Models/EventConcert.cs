using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace fortress.core.Model
{
    public class EventConcert
    {
        public int EventConcertId { get; set; }
        
        public string EventName { get; set; }

        public string Flyer { get; set; }

        public DateTime EventDate { get; set; }

        public bool IsApproved { get; set; }
        
        public string UserNotes { get; set; }

        //public string VenueName { get; set; }

        public Venue Venue { get; set; }

        public string Tickets { get; set; }

        public List<Comment> Comments { get; set; }
    }
}