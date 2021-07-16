using Dapper;
using Data.Services;
using fortress.core.Model;
using fortress.core.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.DAL
{
    public class ConcertRepository : IConcertRepository
    {
        private DapperService context;
        private string connectionString;
        public ConcertRepository(IConfiguration configuration)
        {
            this.context = new DapperService(configuration);
            connectionString = configuration["dbtestconnection"];
        }

        // Gets all approved concerts.
        public async Task<IEnumerable<EventConcert>> GetConcerts()
        {

            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var command = new SqlCommand("GetAllConcerts", cnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                return await cnn.QueryAsync<EventConcert, Venue, EventConcert>(command.CommandText, (concert, venue) =>
                {
                    concert.Venue = venue;
                    return concert;
                },
                splitOn: "VenueId");
            }

        }

        public async Task<EventConcert> GetConcertById(int id)
        {
            //EventConcert result = context.ExecuteSingleProcedureAsync<EventConcert>("GetConcertById", Pairing.Of("@concertId", id)).Result;
            EventConcert concert;
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var parameters = new { id = id };

                IEnumerable<EventConcert> result = await cnn.QueryAsync<EventConcert, Venue, EventConcert>("GetConcertById", (concert, venue) =>
                {
                    concert.Venue = venue;
                    return concert;
                }, splitOn: "VenueId", param: parameters, commandType: CommandType.StoredProcedure);

                concert = result.Single();
            }

            // Individual concert needs comments
            var allComments = GetAllComments(id);
            var tree = new CommentTree(allComments);
            concert.Comments = tree.GetEventComments();

            return concert;
        }

        public async Task<IEnumerable<EventConcert>> GetConcertsByVenue(string venueName)
        {
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var parameters = new { venue = venueName };

                return await cnn.QueryAsync<EventConcert, Venue, EventConcert>("GetAllConcertsByVenue", (concert, venue) =>
                {
                    concert.Venue = venue;
                    return concert;
                }, splitOn: "VenueId", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public void InsertConcert(EventConcert concert)
        {
            // 0 : parent row Id(event), 1: child row id (concert)
            context.ExecuteProcedureAsync("InsertConcert",
                Pairing.Of("@name", concert.EventName),
                Pairing.Of("@flyerurl", concert.Flyer),
                Pairing.Of("@timestart", concert.EventDate),
                Pairing.Of("@isapproved", concert.IsApproved),
                Pairing.Of("@venueId", concert.Venue.VenueId),
                Pairing.Of("@notes", concert.UserNotes),
                Pairing.Of("@tickets", concert.Tickets),
                Pairing.Of("@venueId", concert.Venue.VenueId)
            );
        }

        public void DeleteConcert(int id)
        {
            context.ExecuteProcedureAsync("DeleteConcert", Pairing.Of("@concertId", id));
        }

        public void UpdateConcert(EventConcert concert)
        {
            context.ExecuteProcedureAsync("UpdateConcert",
                Pairing.Of("@concertId", concert.EventConcertId),
                Pairing.Of("@artists", concert.EventName),
                Pairing.Of("@flyerurl", concert.Flyer),
                Pairing.Of("@timestart", concert.EventDate),
                Pairing.Of("@isapproved", concert.IsApproved),
                Pairing.Of("@venueId", concert.Venue.VenueId)
            );

        }

        public async Task<IEnumerable<EventConcert>> GetConcertsByCity(string city)
        {
            //return context.ExecuteProcedureAsync<EventConcert>("GetAllConcertsByCity").Result;
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var parameters = new { city = city };

                return await cnn.QueryAsync<EventConcert, Venue, City, EventConcert>("GetAllConcertsByCity", (concert, venue, city) =>
                {
                    venue.City = city;
                    concert.Venue = venue;
                    return concert;
                }, splitOn: "VenueId,CityId", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }

        private Dictionary<int?, List<Comment>> GetAllComments(int eventId)
        {
            // Key: parentId; Value: list of child comments for that parentId
            var commentDict = new Dictionary<int?, List<Comment>>();

            var allComments
                = context.ExecuteProcedureAsync<Comment>("GetAllEventComments", Pairing.Of("@eventId", eventId)).Result.ToList();

            // sort into dictionary
            foreach (var comment in allComments)
            {
                // root case:
                if (!commentDict.ContainsKey(0))
                {
                    commentDict.Add(0, new List<Comment>());
                }
                if (comment.ParentCommentId == null)
                {
                    commentDict[0].Add(comment);
                    continue;
                }
                // leaf case:
                var parentid = comment.ParentCommentId;
                if (!commentDict.ContainsKey(parentid))
                {
                    commentDict.Add(parentid, new List<Comment>());
                }

                if (comment.ParentCommentId == null)
                {
                    commentDict[0].Add(comment);
                }
                else
                {
                    commentDict[parentid].Add(comment);
                }
            }

            return commentDict;
        }

    }
}
