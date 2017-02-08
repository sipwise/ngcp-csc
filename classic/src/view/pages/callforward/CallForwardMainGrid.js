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

        // TODO: When I use xtype to define tpl (see example below, line 37), it only
        // displays as [object, Object]. Is there a way to do this, or keep it inline?
        // tpl: {
        //     xtype: 'cftpl'
        // }

        me.columns = [{
            dataIndex: 'phone',
            editor: {
                xtype: 'textfield',
                emptyText: 'Enter number'
            },
            renderer: function(value, metaData, record) {
                if (!value && record.phantom) {
                    return 'Enter number';
                } else {
                    return '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>' + value;
                };
            },
            width: 105
            // ,tpl: new Ext.XTemplate( '<tpl><i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>{[!isNaN(parseInt(values.phone.charAt(0))) ? "+" : ""]}{phone}</tpl>' )
        }, {
            dataIndex: 'ring_for',
            align: 'left',
            editor: {
                xtype: 'textfield',
                emptyText: 'Enter secs'
            },
            renderer: function(value, metaData, record) {
                if (!value && record.phantom) {
                    return 'Enter secs';
                } else {
                    return 'and ring for ' + value + ' secs';
                };
            },
            width: 180
            // ,tpl: new Ext.XTemplate( '<tpl>and ring for {ring_for} secs</tpl>' )
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
