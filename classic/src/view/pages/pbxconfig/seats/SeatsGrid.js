Ext.define('NgcpCsc.view.pages.seats.SeatsGrid', {
    extend: 'NgcpCsc.view.core.GridCards',
    xtype: 'seats-grid',
    reference: 'seatsGrid',
    store: 'Seats',
    cls: 'card-grid',
    header: false,
    rowLines: false,
    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
        },
        cellclick: 'expandConversation',
        rowbodyclick: 'expandConversation'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: false,
        enableTextSelection: true
    },
    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'name'
        }]
    },

    initComponent: function() {
        var me = this;
        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('extension') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('groups') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('numbers') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('phone_devices') + '</div>' +
                    '<div class="card-icon-row">' +
                    '<div id="editSeat-' + record.get('id') + '" class="card-icon" data-callback="editSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeSeat-' + record.get('id') + '" class="card-icon" data-callback="removeSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>';
                return {
                    rowBody: content
                };
            }
        }];
        this.callParent();
    }
})
