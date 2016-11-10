Ext.define('NgcpCsc.store.Sourcesets', {
    extend: 'Ext.data.Store',

    storeId: 'Sourcesets',

    fields: [
        {name: 'source', type: 'string'}
    ],

    data: [
        {
            source: 'Anyone'
        },{
            source: '43223344'
        },{
            source: '43227744'
        },{
            source: '43228844'
        },{
            source: '43229944'
        }
    ]

});
