Ext.define('NgcpCsc.view.pages.groups.GroupsGrid', {
    extend: 'NgcpCsc.view.core.GridCards',
    xtype: 'groups-grid',
    reference: 'groupsGrid',
    store: 'Groups',
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

    // TODO: 0. Figure out why most of the time clicking on rowbody header does not toggle hidden
    // TODO: 1a. Groups, impl gridfilters
    // TODO: 1b. Seats, impl gridfilters
    // TODO: 2. For groups, numbers and phone/devices should be in a list, not comma separated
    // TODO: Xa. Display children nodes devices, disc with cvenusino. Own ticket w/ other dev tasks?
    // TODO: Xb. Devices, impl gridfilters, disc with cvenusino. Own ticket w/ other dev tasks?

    initComponent: function() {
        var me = this;
        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('extension') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_policy') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_timeout') + '</div>' +
                    '<div class="card-icon-row">' +
                    '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editGroup" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_group[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeGroup-' + record.get('id') + '" class="card-icon" data-callback="removeGroup" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_group[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>';
                return {
                    rowBody: content
                };
            }
        }];
        this.callParent();
    }
})
