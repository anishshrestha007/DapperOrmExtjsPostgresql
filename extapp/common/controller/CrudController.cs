using extapp.common.model;
using extapp.common.service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace extapp.common.controller
{
    public class CrudController<TModel,TService,TKey> : ApiController
        where TModel:class, CModel,new()
        where TService:class,CService<TModel, TKey>,new()
    {
    }
}
