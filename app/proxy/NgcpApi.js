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
    baseApiUrl: '/api/',
    autoLoad: true,
    appendId: false,
    pageParam : false, //to remove param "page"
    startParam : false, //to remove param "start"
    limitParam : false, //to remove param "limit"
    // defaults, can be overridden
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
        if(!me.addSubscriber){
            me.params = 'subscriber_id=' + localStorage.getItem('subscriber_id');
        }
        switch (action) {
            case 'read':
                me.headers = {
                    'Content-Type': 'application/json'
                };
                url = Ext.String.format('{0}{1}/{2}?{3}', me.baseApiUrl, me.route, me.addSubscriber ? localStorage.getItem('subscriber_id') : '', me.params);
                break;
            case 'update':
                me.headers = (me.actionMethods.update == 'PUT') ? {
                    'Content-Type': 'application/json'
                } : {
                    'Content-Type': 'application/json-patch+json'
                };

                records = request._records;
                url = Ext.String.format('{0}{1}/{2}', me.baseApiUrl, me.route, me.addSubscriber ? localStorage.getItem('subscriber_id') : records[0].get('id'));
                break;
        }
        request._url = url;
        return me.callParent(arguments);
    },
    reader: {
        type: 'json'
    },
    writer: {
        writeAllFields: true,
        transform: {
            fn: function(data, request) {
                var updateMethod = request._proxy.actionMethods.update;
                // patch requires data folded in array
                return (updateMethod == 'PATCH' && !Ext.isArray(data)) ? [data] : data;
            }
        }
    }
});
