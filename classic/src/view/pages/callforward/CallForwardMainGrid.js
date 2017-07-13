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
                return 'below-voicemail';
            } else {
                return 'above-voicemail';
            }
        }
    },

    // DONE: 1. Handle read rendering of all non-number values
    // DONE: 2. Partly rewrite controller for handling destination displayed vs what we get from API / aka sort destination values before displaying in view (implications with current destination_cleaned field)
    // DONE:    a. Deep-dive into controller to investigate how to do this
    // DONE:    g. Check with curl if you can PATCH with full destination value and no simple_destination, and if destination_cleaned should be handled in renderer instead [WORKS, creates simple value from sip:<simplevalue>@host]
    // DONE:    c. In writeNewDestinationToStore(), parse destinations to correct destinations field value before creating model
    // DONE:    e. For destination written to API, currently new numbers does not have priority key and value incl in value object, and non-numbers are missing destination key and value. Check if investigation in a) explains why and check that TODO points above fixes this - and if not, fix it completely
    // DONE:    f. While you're working on this, it makes sense to implement a model class specifically for destinations, extending from proxy model
    // DONE:    b. Add field for label to model (label: "first ring"), set ot "then forward to" as default, and handle "first ring" cases
    // DONE:    d. Evaluate implications of storing number/conference/voicebox/etc as destibations in view instead of full sip URI
    // DONE:    h. Set right after_termination value for new records, so color coding is correct
    // DONE: 4. Implement reordering of destinations listener on drop event, and controller for the reordering in store and sync
    // DONE: 5. Implement color changes on reordering
    // DONE: 3. Implement new controller for handling Ajax PATCH request based on destination ID, plus hook this into dragdrop controller
    // DONE: 8. Handle adding new non-number destinations
    // TODO: 6. Implement cft/cfu rules, and handle reordering of "own phone" (maybe disable it by default in grid, or disable reorder/delete)
    // TODO: X. Handle rendering of destinations in grid with renderer instead of in controller with destinations_displayed and timeout_displayed
    // TODO: 7. Depending on how rest of task goes: Create new task -> Consider the fact that one destinationset can be in several grids, so if you write one, update all other grids with that same destinationset id

    // NOTE: Right now we're using destination_cleaned to send PATCH requests on
    // API write. This does not work for destination types other than
    // URI/Number. Rewrite to always send destination field instead, and make
    // sure for adding new destinations to grids we're

    // NOTE STATUS: For destination write to API, new numbers does not have priority key and value incl in value object, and non-numbers are missing destination key and value

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
