using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using extapp.Master;
using extapp.DbConnect;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using Npgsql;
using Dapper;

namespace extapp.Custom
{
   
    public class CustomCrudRepo : ICustomRepo
    {
        IDbConnection _db = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        //ConnectionProvider _db = new ConnectionProvider(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        public bool DeleteCustomer(int customerId)
        {
            int rowsAffected = this._db.Execute(@"DELETE FROM [jeremy].[Customer] WHERE CustomerID = @CustomerID", new { CustomerID = customerId });

            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }

        public List<TestModel> GetCustomers(int amount, string sort)
        {
            return this._db.Query<TestModel>("SELECT  CustomerID,CustomerFirstName,CustomerLastName,IsActive FROM Customer ORDER BY CustomerID " + sort).ToList();
        }

        public TestModel GetSingleCustomer(int customerId)
        {
            return _db.Query<TestModel>("SELECT[CustomerID],[CustomerFirstName],[CustomerLastName],[IsActive] FROM [Customer] WHERE CustomerID =@CustomerID", new { CustomerID = customerId }).SingleOrDefault();
        }

        public bool InsertCustomer(TestModel ourCustomer)
        {
            int rowsAffected = this._db.Execute(@"INSERT Customer([CustomerFirstName],[CustomerLastName],[IsActive]) values (@CustomerFirstName, @CustomerLastName, @IsActive)", new { CustomerFirstName = ourCustomer.CustomerFirstName, CustomerLastName = ourCustomer.CustomerLastName, IsActive = true });

            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }
    

        public bool UpdateCustomer(TestModel ourCustomer)
        {
            int rowsAffected = this._db.Execute("UPDATE [Customer] SET [CustomerFirstName] = @CustomerFirstName ,[CustomerLastName] = @CustomerLastName, [IsActive] = @IsActive WHERE CustomerID = " + ourCustomer.CustomerID, ourCustomer);

            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }
    }
}