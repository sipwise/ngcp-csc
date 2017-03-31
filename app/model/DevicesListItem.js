Ext.define('NgcpCsc.model.DevicesListItem', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    },{
        name: 'img',
        type: 'string'
    },{
        name: 'destinations',
        type: 'auto'
    }]
});
