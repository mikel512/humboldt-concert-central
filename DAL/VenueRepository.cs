using Data.Services;
using fortress.core.Model;
using fortress.core.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace fortress.core.DAL
{
    public class VenueRepository: IVenueRepository
    {
        private DapperService context;
        private string connectionString;

        public VenueRepository(IConfiguration configuration)
        {
            this.context = new DapperService(configuration);
            this.connectionString = configuration["dbtestconnection"];
        }

        public async Task<Venue> GetVenueById(int id)
        {
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var parameters = new { id = id };

                IEnumerable<Venue> result = await cnn.QueryAsync<Venue, City, Venue>("GetVenueById", (venue, city) =>
                {
                    venue.City = city;
                    return venue;
                }, splitOn: "CityId", param: parameters, commandType: CommandType.StoredProcedure);

                return result.Single();
            }
        }

        public async Task<IEnumerable<Venue>> GetVenues()
        {
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var command = new SqlCommand("GetAllVenues", cnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                return await cnn.QueryAsync<Venue, City, Venue>(command.CommandText, (venue, city) =>
                {
                    venue.City = city;
                    return venue;
                },
                splitOn: "CityId");
            }
        }

        public async Task<IEnumerable<Venue>> GetVenuesByCity(string city)
        {
            using (var cnn = new SqlConnection(connectionString))
            {
                cnn.Open();
                var parameters = new { city = city };

                return await cnn.QueryAsync<Venue, City, Venue>("GetAllVenuesByCity", (venue, city) =>
                {
                    venue.City = city;
                    return venue;
                }, splitOn: "CityId", param: parameters, commandType: CommandType.StoredProcedure);

            }

        }

        public void InsertVenue(Venue venue)
        {
            context.ExecuteProcedureAsync("InsertVenue",
                Pairing.Of("@venue", venue.VenueName),
                Pairing.Of("@location", venue.Location),
                Pairing.Of("@city", venue.City),
                Pairing.Of("@address", venue.Address),
                Pairing.Of("@description", venue.Description),
                Pairing.Of("@picture", venue.Picture),
                Pairing.Of("@logo", venue.Logo),
                Pairing.Of("@tickets", venue.TicketsLink),
                Pairing.Of("@menu", venue.MenuLink),
                Pairing.Of("@hours", venue.Hours),
                Pairing.Of("@cityId", venue.City.CityId)
            );
        }

        public void UpdateVenue(Venue venue)
        {
            context.ExecuteProcedureAsync("UpdateVenue",
                Pairing.Of("@id", venue.VenueId),
                Pairing.Of("@venue", venue.VenueName),
                Pairing.Of("@location", venue.Location),
                Pairing.Of("@city", venue.City),
                Pairing.Of("@address", venue.Address),
                Pairing.Of("@description", venue.Description),
                Pairing.Of("@picture", venue.Picture),
                Pairing.Of("@logo", venue.Logo),
                Pairing.Of("@tickets", venue.TicketsLink),
                Pairing.Of("@menu", venue.MenuLink),
                Pairing.Of("@hours", venue.Hours),
                Pairing.Of("@cityId", venue.City.CityId)
            );
        }

        // Deleting venue must also delete all concerts referencing it. 
        // Therefore it will be implemented at a later time.
        public void DeleteVenue(int id)
        {
            throw new NotImplementedException();
            //context.ExecuteProcedureAsync("DeleteVenue", Pairing.Of("@id", id));
        }

    }
}
