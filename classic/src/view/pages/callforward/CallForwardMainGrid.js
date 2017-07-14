Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
    extend: 'Ext.grid.Panel',

    selModel: 'cellmodel',

    rowLines: false,
    width: '100%',
    hideHeaders: true,
    ui: 'cf-grid',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: Ngcp.csc.locales.callforward.drag_text[localStorage.getItem('languageSelected')]
        },
        markDirty: false,
        emptyText: Ngcp.csc.locales.callforward.nowhere[localStorage.getItem('languageSelected')],
        deferEmptyText: false,
        stripeRows: false,
        listeners: {
            drop: 'destinationDropped'
        }
    },

    listeners: {
        render: function(grid) {
           grid.body.mask('Loading...');
           var store = grid.getStore();
           Ext.defer(function() {
               store.load;
           }, 100);
        },
        delay: 200
   },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    initComponent: function() {
        var me = this;

        me.columns = [{
            dataIndex: 'destination_cleaned', // Renderer also uses ring_for value
            width: 285,
            renderer: 'renderDestinationColumn'
        }, {
            text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            iconCls: Ngcp.csc.icons.trash,
            handler: 'removeEntry'
        }, {
            text: Ngcp.csc.locales.callforward.move[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            disabled: true,
            iconCls: Ngcp.csc.icons.move
        }];

        me.callParent();

    }

});
