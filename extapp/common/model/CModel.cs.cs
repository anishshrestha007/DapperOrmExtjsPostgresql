using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace extapp.common.model
{
    public interface CModel
    {
        string firstname { get; set; }
        string lastname { get; set; }
        string address { get; set; }

    }
}