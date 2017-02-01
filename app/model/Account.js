Ext.define('NgcpCsc.model.Password', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'new_password',
        type: 'string'
    }, {
        name: 'old_password',
        type: 'string'
    }, {
        name: 'repeat_password',
        type: 'string'
    }],

    proxy: {
        type: 'ajax',
        url: '/resources/data/password.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
