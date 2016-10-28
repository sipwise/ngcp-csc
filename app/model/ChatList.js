Ext.define('NgcpCsc.model.ChatList', {
    extend: 'Ext.data.Model',
    fields: [{
        type: 'int',
        name: 'id'
    }, {
        type: 'string',
        name: 'name'
    }, {
        type: 'string',
        name: 'thumbnail'
    }, {
        type: 'boolean',
        name: 'online'
    }]
});
