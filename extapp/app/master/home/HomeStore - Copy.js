Ext.define('app.master.home.Model', {
   extend: 'Ext.data.Model',
   alias: 'model.home',
   fields: [
       'CustomerID', 'CustomerFirstName', 'CustomerLastName', 'IsActive'
   ],
   proxy: {
       type: 'rest',
       url: 'api/Test',
       reader: {
           type: 'json',
           messageProperty: 'message',
           rootProperty: 'data'
       }
   }
});

Ext.define('app.master.home.HomeStore', {
   extend: 'Ext.data.Store',
   alias: 'store.homeStore',
   model: 'app.master.home.Model',
   pageSize: 13
});
