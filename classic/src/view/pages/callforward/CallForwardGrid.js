Ext.define('NgcpCsc.view.pages.callforward.CallForwardGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardgrid',

    store: 'CallForward',

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    trackMouseOver: false,
    // this prevent successfull drop
    // disableSelection: true,

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to move'
        }
    },

    initComponent: function() {
        var me = this;

        me.columns = [{
            text: 'Phone',
            dataIndex: 'phone',
            flex: 2
        }, {
            text: 'Active',
            xtype: 'actioncolumn',
            flex: 1,
            align: 'center',
            dataIndex: 'active',
            items: [{
                iconCls: 'x-fa fa-toggle-on',
                getClass: 'getActionClass'
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
            text: 'Move',
            xtype: 'actioncolumn',
            width: 60,
            align: 'center',
            disabled: true,
            iconCls: 'x-fa fa-arrows'
        }];

        me.callParent();

    }

});
