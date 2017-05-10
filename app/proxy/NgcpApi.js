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
    baseApiUrl: 'https://localhost:1443/api/',
    autoLoad: true,
    appendId: false,
    actionMethods: {
        read: 'GET',
        create: 'POST',
        update: 'PUT',
        destroy: 'DELETE'
    },
    buildUrl: function(request) {
        var me = this;
        var action = request._action;
        var url, records;
        switch(action){
            case 'read' :
                url = Ext.String.format('{0}{1}/?{2}', me.baseApiUrl, me.route, me.params);
            break;
            case 'update' :
                records = request._records;
                url = Ext.String.format('{0}{1}/{2}', me.baseApiUrl, me.route, records[0].get('id'));
            break;
        }
        request._url = url;
        return me.callParent(arguments);
    },
    reader: {
        type: 'json'
    },
    writer: {
        writeAllFields: true
    }
});
