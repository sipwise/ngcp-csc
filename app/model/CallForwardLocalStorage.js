Ext.define('NgcpCsc.model.CallForwardLocalStorage', {
    extend: 'Ext.data.Model',

    fields: [{
        type: 'int',
        name: 'id'
    }, {
        type: 'boolean',
        name: 'afterHoursCollapsed'
    },{
        type: 'boolean',
        name: 'companyHoursCollapsed'
    }]

});
