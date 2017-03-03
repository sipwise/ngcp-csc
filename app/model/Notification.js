Ext.define('NgcpCsc.model.Notification', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'new_message',
        type: 'string'
    }, {
        name: 'chatEnabled',
        type: 'boolean'
    }],

    proxy: {
        type: 'ajax',
        url: '/resources/data/message.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
