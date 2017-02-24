Ext.define('NgcpCsc.view.pages.devices.DevicesGrid', {
    extend: 'NgcpCsc.view.core.GridCards',
    xtype: 'devices-grid',
    reference: 'devicesGrid',
    store: 'Devices',
    cls: 'card-grid',
    header: false,
    rowLines: false,
    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon, div.number-circle'
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

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('device') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('mac') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('status') + '</div>' +
                    '<div class="img-row"><img src="' + record.get('image') + '"></div>' +
                    '<div class="card-icon-row">' +
                    '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editDevice" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeDevice-' + record.get('id') + '" class="card-icon" data-callback="removeGroup" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>';
                return {
                    rowBody: content
                };
            }
        }];
        this.callParent();
    }
})
