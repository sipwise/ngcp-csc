Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
    extend: 'Ext.grid.Panel',

    selModel: 'cellmodel',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: Ngcp.csc.locales.callforward.drag_text[localStorage.getItem('languageSelected')]
        },
        markDirty: false,
        emptyText: 'nowhere'
    },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    hideHeaders: true,
    
    ui: 'cf-grid-tpl',

    initComponent: function() {
        var me = this;

        me.columns = [{
            dataIndex: 'phone',
            width: 105,
            editor: {
                xtype: 'textfield',
                emptyText: 'Enter number'
            },
            renderer: 'renderPhoneColumn'
        }, {
            dataIndex: 'ring_for',
            align: 'left',
            width: 180,
            editor: {
                xtype: 'textfield',
                emptyText: 'Enter secs'
            },
            renderer: 'renderSecsColumn'
        }, {
            text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',

            iconCls: 'x-fa fa-trash',
            handler: 'removeEntry'
        }, {
            text: Ngcp.csc.locales.callforward.move[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            disabled: true,
            iconCls: 'x-fa fa-arrows'
        }];

        me.callParent();

    }

});
