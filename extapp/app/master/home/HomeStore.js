// Ext.define('app.master.home.HomeStore', {
//     extend: 'Ext.data.Store',
//     alias: 'store.homeStore',
//     fields: [
//         'sn', 'code', 'nameen', 'code', 'name_en', 'namenp', 'datead', 'desc'
//     ],
//     data: {
//         items: [{
//             sn: "1",
//             code: "c123",
//             nameen: "Rakesh",
//             namenp: "Rakesh",
//             desc: "hero is boy"
//         }, {
//             sn: "2",
//             code: "c323",
//             nameen: "shekhar",
//             namenp: "shekharnp",
//             desc: "it is behaving"
//         }, {
//             sn: "3",
//             code: "c32",
//             nameen: "parmeshwor",
//             namenp: "parmeshwornp",
//             desc: "savior of journey"
//         }, {
//             sn: "4",
//             code: "f334",
//             nameen: "pokemon",
//             namenp: "pokemonnp",
//             desc: "she is secret"
//         }]
//     },
//     proxy: {
//         type: 'memory',
//         reader: {
//             reader: 'json',
//             rootProperty: 'items'
//         }
//     }
// });

//using model

Ext.define('app.master.home.Model', {
   extend: 'Ext.data.Model',
   alias: 'model.homede',
   fields: [
       'sn', 'code', 'name_np','name_en', 'desc'
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
   alias: 'store.homeStore', //same as ListPanel  store type
   model: 'app.master.home.Model',
   pageSize: 13
});
