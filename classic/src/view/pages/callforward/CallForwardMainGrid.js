Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
    extend: 'Ext.grid.Panel',

    store: Ext.create('NgcpCsc.store.CallForward', {
        storeId: 'CallForwardBusy',
        proxy: {
            type: 'ajax',
            url: '/resources/data/callForwardBusy.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }),

    selModel: 'cellmodel',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: Ngcp.csc.locales.callforward.drag_text[localStorage.getItem('languageSelected')]
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
            text: Ngcp.csc.locales.callforward.phone[localStorage.getItem('languageSelected')],
            dataIndex: 'phone',
            flex: 2,
            editor: 'textfield'
        }, {
            text: Ngcp.csc.locales.common.active[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            flex: 1,
            align: 'center',
            dataIndex: 'active',
            items: [{
                getClass: 'toggleIconClass',
                handler: 'toggleActive'
            }]
        }, {
            text: Ngcp.csc.locales.callforward.ring_for[localStorage.getItem('languageSelected')],
            flex: 1,
            xtype: 'widgetcolumn',
            dataIndex: 'ring_for',
            editable: false,
            widget: {
                xtype: 'combo',
                value: '20 secs',
                store: ['0 secs', '10 secs', '20 secs', '30 secs', '40 secs', '50 secs', '60 secs']
            }
        }, {
            text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 70,
            align: 'center',
            iconCls: 'x-fa fa-trash',
            handler: 'removeEntry'
        }, {
            text: Ngcp.csc.locales.callforward.move[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 70,
            align: 'center',
            disabled: true,
            iconCls: 'x-fa fa-arrows'
        }];

        me.callParent();

    }

});
