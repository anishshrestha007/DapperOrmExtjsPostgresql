using extapp.common.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace extapp.common.service
{
    public interface CService<TModel,TKey>
        where TModel:class,CModel,new()
    {

    }
}