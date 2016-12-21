Ext.define('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardtimeset-grid',

    store: 'CallForwardTimeset',

    initComponent: function() {
        this.columns = {
            // TODO: Bug? Menu is not disabled
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: 'Day',
                dataIndex: 'day',
                flex: 1
            }, {
                text: 'Time',
                dataIndex: 'time_full',
                align: 'right',
                flex: 1
            }, {
                xtype: 'actioncolumn',
                text: 'Edit',
                align: 'right',
                width: 30,
                iconCls: 'x-fa fa-angle-right',
                handler: 'editTimesetDay'
            }]
        };
        this.callParent();
    }

});
