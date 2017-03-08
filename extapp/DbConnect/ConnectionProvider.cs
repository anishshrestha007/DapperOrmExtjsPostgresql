using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace extapp.DbConnect
{
    public class ConnectionProvider : IDisposable
    {
        public readonly IDbConnection dbConnection;

        public ConnectionProvider(string connectionString)
        {
            dbConnection = new NpgsqlConnection(connectionString);
            dbConnection.Open();
        }

        public void Dispose()
        {
            dbConnection.Close();
        }
    }
}