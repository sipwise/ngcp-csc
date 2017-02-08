Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
    extend: 'Ext.grid.Panel',

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
            xtype: 'templatecolumn',
            dataIndex: 'sentence',
            flex: 2,
            editor: 'textfield',
            tpl: new Ext.XTemplate( '<ul><tpl><li>{[!isNaN(parseInt(values.phone.charAt(0))) ? "+" : ""]}{phone} and ring for {ring_for} secs</li></tpl></ul>' )
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
