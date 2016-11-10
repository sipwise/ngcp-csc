Ext.define('NgcpCsc.store.Timesets', {
    extend: 'Ext.data.Store',

    storeId: 'Timesets',

    fields: [
        {name: 'period', type: 'string'}
    ],

    data: [
        {
            period: 'Always'
        },{
            period: 'During office hours'
        },{
            period: 'Out of office hours'
        }
    ]

});
