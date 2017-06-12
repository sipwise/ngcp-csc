Ext.define('NgcpCsc.view.pages.callforward.always.AlwaysTestGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'alwaystestgrid',
    store: 'CallForwardInitialAlways',
    width: '100%',

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: 'Destination',
                dataIndex: 'destination',
                flex: 1
            }, {
                text: 'Timeout',
                dataIndex: 'timeout',
                flex: 1
            }]
        };
        this.callParent();
    }

});
