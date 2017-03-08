using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace extapp.Master
{
	public class TestModel
	{
        public int CustomerID { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public bool IsActive { get; set; }
    }
}