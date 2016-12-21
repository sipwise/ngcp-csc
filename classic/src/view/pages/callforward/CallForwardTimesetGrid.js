Ext.define('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardtimesetgrid',

    viewConfig: {
        markDirty: false
    },

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: 'Day',
                dataIndex: 'day',
                renderer: 'renderDay',
                flex: 1
            }, {
                text: 'From',
                dataIndex: 'time_from',
                xtype: 'widgetcolumn',
                editable: false,
                flex: 1,
                widget: {
                    xtype: 'timefield'
                }
            }, {
                text: 'To',
                dataIndex: 'time_to',
                xtype: 'widgetcolumn',
                editable: false,
                flex: 1,
                widget: {
                    xtype: 'timefield'
                }
            }, {
                text: 'Closed',
                dataIndex: 'closed',
                xtype: 'actioncolumn',
                align: 'center',
                width: 80,
                items: [{
                    getClass: 'toggleClosedClass',
                    handler: 'toggleClosedState'
                }]
            }]
        };
        this.callParent();
    }

});
