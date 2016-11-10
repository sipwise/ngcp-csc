Ext.define('NgcpCsc.store.Destinationsets', {
    extend: 'Ext.data.Store',

    storeId: 'Destinationsets',

    fields: [
        {name: 'destination', type: 'string'}
    ],

    data: [
        {
            destination: 'Voicemail'
        },{
            destination: 'Conference'
        },{
            destination: 'Fax2Mail'
        },{
            destination: 'Calling Card'
        },{
            destination: 'Call Through'
        },{
            destination: 'Local Subscriber'
        },{
            destination: 'URI/Number'
        }
    ]

});
