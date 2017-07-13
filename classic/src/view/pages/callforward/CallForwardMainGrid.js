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

    // TODO 1.  Plan out the task properly, in enough detail to be sure you
    //         aren't blocked in any way
    // TODO 2.  Implement first ring in grid
    // TODO     a. Implement column/layout/controller for first ring in grid
    // TODO     b. Implement logic for propely displaying cft/cfu in online grid
    // TODO 3.  Implement reordering of rows logic and writing/saving of changes
    // DONE 4a. Implement proper load mask, and unmask in controller
    // TODO 4b. Fix "List A" and "List B" onTabClicked unmask bug
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
