Ext.define('NgcpCsc.view.pages.groups.GroupsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'groups-grid',

    reference: 'groupsGrid',

    store: 'Groups',

    cls: 'card-grid',

    // TODO: Look up documentation on this config
    header: false,

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
        },
        // mouseover: {
        //     fn: 'onIconHovered',
        //     element: 'el',
        //     delegate: 'div.card-icon'
        // },
        cellclick: 'expandConversation',
        rowbodyclick: 'expandConversation'
    },

    rowLines: false,

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
        // DONE: 1a. Replace with rowbody
        // TODO: 1b. Implement rowbody controllers based on conversations
        // TODO: 1c. Check how it looks and behaves
        // TODO: 1d. Fix tooltips and implement in locales
        var me = this;
        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('extension') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_policy') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_timeout') + '</div>' +
                    '<div class="card-icon-row">' +
                    '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editGroup" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.new_sms[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeGroup-' + record.get('id') + '" class="card-icon" data-callback="removeGroup" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>';
                return {
                    rowBody: content
                };
            }
        }];

        this.callParent();
    }
})
