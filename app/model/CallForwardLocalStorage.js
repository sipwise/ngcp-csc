Ext.define('NgcpCsc.model.CallForwardLocalStorage', {
    extend: 'Ext.data.Model',

    fields: ['id', 'afterHoursCollapsed'],

    proxy: {
        type: 'localstorage',
        id  : 'callForward'
    }

});
