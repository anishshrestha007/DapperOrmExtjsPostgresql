using extapp.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace extapp.Master
{
    public class TestController : ApiController
    {
        private CustomCrudRepo _ourCustomerRespository = new CustomCrudRepo();

        [HttpGet]
        public List<TestModel> Get()
        {
            return _ourCustomerRespository.GetCustomers(10, "ASC");
        }

        // GET: api/Test/5
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public bool Post([FromBody]TestModel ourCustomer)
        {
            return _ourCustomerRespository.InsertCustomer(ourCustomer);
        }

        // PUT: api/Test/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Test/5
        public void Delete(int id)
        {
        }
    }
}
