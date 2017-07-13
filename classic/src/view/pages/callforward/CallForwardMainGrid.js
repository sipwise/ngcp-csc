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
        },
        getRowClass: function(record, index) {
            var afterTermination = record.get('after_termination');
            if (afterTermination) {
                return 'below-termination';
            } else {
                return 'above-termination';
            }
        }
    },

    // TODO
    // 11. Implement cft/cfu rules, and handle reordering of "own phone"
    //     (maybe disable it by default in grid, or disable reorder/delete)
    // 12. Depending on how rest of task goes: Create new task -> Consider
    //     the fact that one destinationset can be in several grids, so if
    //     you write one, update all other grids with that same
    //     destinationset id

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    initComponent: function() {
        var me = this;

        me.columns = [{
            dataIndex: 'label',
            width: 125
        }, {
            dataIndex: 'destination_displayed', // Renderer also uses ring_for value
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
