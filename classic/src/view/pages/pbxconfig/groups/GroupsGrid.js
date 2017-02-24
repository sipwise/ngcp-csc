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
        cellclick: 'expandPbxCard',
        rowbodyclick: 'expandPbxCard'
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

    // TODO: 1. Fix broken "delete record" icons
    // TODO: 2. Center cards
    // TODO: 3. For groups (numbers and phone/devices) and devices (estinations), child nodes should be in a list, not comma separated

    initComponent: function() {
        var me = this;
        var arr = [1, 2, 3];
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
