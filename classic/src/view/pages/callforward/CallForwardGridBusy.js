Ext.define('NgcpCsc.view.pages.callforward.CallForwardGridBusy', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardgridbusy',

    bind: {
        store: '{busyCfs}'
    },

    selModel: 'cellmodel',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to move'
        },
        markDirty: false
    },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    initComponent: function() {
        var me = this;

        me.columns = [{
            text: 'Phone',
            dataIndex: 'phone',
            flex: 2,
            editor: 'textfield'
        }, {
            text: 'Active',
            xtype: 'actioncolumn',
            flex: 1,
            align: 'center',
            dataIndex: 'active',
            items: [{
                getClass: 'toggleIconClass',
                handler: 'toggleActive'
            }]
        }, {
            text: 'Ring For',
            flex: 1,
            xtype: 'widgetcolumn',
            dataIndex: 'ring_for',
            widget: {
                xtype: 'combo',
                value: '20 secs',
                store: ['0 secs', '10 secs', '20 secs', '30 secs', '40 secs', '50 secs', '60 secs']
            }
        }, {
            text: 'Delete',
            xtype: 'actioncolumn',
            width: 70,
            align: 'center',
            iconCls: 'x-fa fa-trash',
            handler: 'removeEntry'
        }, {
            text: 'Move',
            xtype: 'actioncolumn',
            width: 70,
            align: 'center',
            disabled: true,
            iconCls: 'x-fa fa-arrows'
        }];

        me.callParent();

    }

});
