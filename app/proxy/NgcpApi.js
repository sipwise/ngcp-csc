/**
Ex. usage in model/store:
proxy: {
    type: 'ngcp-api',
    route: 'reminders/',
    autoLoad: true
}
**/
Ext.define('NgcpCsc.proxy.NgcpApi', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ngcp-api',
    /* temporary authentication, should be bound to auth token once implemented*/
    withCredentials: true,
    username: 'administrator',
    password: 'administrator',
    baseUrl: 'https://localhost:1443/api/',
    actionMethods: {
        read: 'GET',
        create: 'POST',
        update: 'PUT',
        destroy: 'DELETE'
    },
    buildUrl: function(request) {
        var me = this;
        var url = Ext.String.format('{0}{1}', me.baseUrl, me.route);
        request._url = url;
        return me.callParent(arguments);
    },
    reader: {
        type: 'json',
        rootProperty: 'data'
    }
});
