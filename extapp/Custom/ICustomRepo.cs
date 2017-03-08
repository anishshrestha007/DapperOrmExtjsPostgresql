using extapp.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace extapp.Custom
{
    internal interface ICustomRepo
    {
        List<TestModel> GetCustomers(int amount, string sort);

        TestModel GetSingleCustomer(int customerId);

        bool InsertCustomer(TestModel ourCustomer);

        bool DeleteCustomer(int customerId);

        bool UpdateCustomer(TestModel ourCustomer);
    }
}
