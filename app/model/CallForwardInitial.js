Ext.define('NgcpCsc.model.CallForwardInitial', {
    extend: 'Ext.data.Model',



    fields: [{
        name: 'id', // NOTE: This endpoint doesn't have an id value
        type: 'string'
    }, {
        name: 'cfb',
        type: 'auto'
    }, {
        name: 'cfna',
        type: 'auto'
    }, {
        name: 'cfs', // NOTE: Not used
        type: 'auto'
    },{
        name: 'cft',
        type: 'auto'
    },  {
        name: 'cfu',
        type: 'auto'
    }]

});
