Ext.define('NgcpCsc.model.CallForwardInitial', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id', // NOTE: This endpoint doesn't have an id value
        type: 'string'
    }, {
        name: 'cfb',
        type: 'string'
    }, {
        name: 'cfna',
        type: 'string'
    }, {
        name: 'cfs', // NOTE: Not used
        type: 'string'
    },{
        name: 'cft',
        type: 'string'
    },  {
        name: 'cfu',
        type: 'string'
    }]

});
