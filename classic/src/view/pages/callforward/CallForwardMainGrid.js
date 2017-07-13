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
            var afterCft = record.get('after_voicemail');
            if (afterCft) {
                return 'below-voicemail';
            } else {
                return 'above-voicemail';
            }
        }
    },

// TODO:
//  2. Implement first ring in grid
//      a. Implement column/layout for first ring in grid
//      b. Implement logic for properly displaying cft/cfu in online grid
//  3 Greying out of destinations below Voicemail/Conf/etc
//    a. Implement renderer and handler for destinations that are non-number
//       (Voicemail, Fax2Mail/Fax, Conference, Announcement, etc)
//  4. Implement reordering of rows logic and writing/saving of changes
//     b. Define new priority when drag and dropping destinations
//     c. Need to handle cases where destination is not a number, i.e.:
//        Voicemail, Fax2Mail/Fax, Conference, Announcement,
//        Autoattendant (check docs for correct values and to verify
//        destinations)

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
