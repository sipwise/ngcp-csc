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

    // TODO: 2. Implement first ring in grid
    // TODO:      a. Implement column/layout for first ring in grid
    // TODO:      b. Implement logic for properly displaying cft/cfu in online grid
    // TODO: 3. Greying out of destinations below Voicemail/Conf/etc
    // TODO:    a. Implement renderer and handler for destinations that are non-number
    //             (Voicemail, Fax2Mail/Fax, Conference, Announcement, etc)
    // TODO: 4. Implement reordering of rows logic and writing/saving of changes
    // DONE:    b. Define new priority when drag and dropping destinations
    // TODO:    c. Need to handle cases where destination is not a number, i.e.:
    //             Voicemail, Fax2Mail/Fax, Conference, Announcement,
    //             Autoattendant (check docs for correct values and to verify
    //             destinations)
    // TODO: 3a and 4c together
    // DONE: x. find out correct values to use for these when sending PATCH
    // requests
    // NOTE: Right now we're using destination_cleaned to send PATCH requests on
    // API write. This does not work for destination types other than
    // URI/Number. Rewrite to always send destination field instead, and make
    // sure for adding new destinations to grids we're

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
