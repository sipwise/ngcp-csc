Ext.define('NgcpCsc.view.pages.callforward.CallForwardGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardgrid',

    bind: {
        store: '{onlineCfs}'
    },

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    trackMouseOver: false,


    // TODO: 1. Create new empty row button/controller is broken. Fix.
    // TODO: 2. Create 'CallForwardBusy' and 'CallForwardOffline' stores
    // TODO: 3. Look over styling, and make any obvious changes
    // TODO: 4. Duplicate grid and form for "phone busy" and "phone online"
    // TODO: 5. Look through code for superfluous pieces and cleanups
    // TODO: 6. Create tickets for:
    //      a) grid cells editable
    //      b) implement change timeset hours widget
    //      c) implement unique form and grid for all time -and sourceset combinations

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to move'
        },
        markDirty: false
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
