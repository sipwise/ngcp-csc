Ext.define('NgcpCsc.model.CallForwardDestination', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'id',
            type: 'string'
        },
        {
            name: 'type'
        },
        {
            name: 'destination_displayed'
        },
        {
            name: 'destination'
        },
        {
            name: 'after_termination',
            defaultValue: false
        },
        {
            name: 'destination_announcement_id',
            defaultValue: null
        },
        {
            name: 'priority',
            defaultValue: '1'
        },
        {
            name: 'timeout_displayed'
        },
        {
            name: 'timeout'
        },
        {
            name: 'sourceset'
        },
        {
            name: 'timeset'
        },
        {
            name: 'destinationset_id'
        },
        {
            name: 'destinationset_name'
        },
        {
            name: 'label',
            defaultValue: ''
        },
        {
            name: 'empty_online'
        }
    ]

});
