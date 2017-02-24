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
    userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',

    // XXX: Cvenusino: For devices, a) We need new specs from andreas, and b)
    // No matter what the new specs are, we either need to use child nodes,
    // and/or pull data from other endpoints/data resources for the destinations
    // and positioning of the destinations data on the images. As these anyways
    // depend on the specs to know 100% what we need to account for in the
    // implementation, I propose we leave this module as is for this iteration,
    // and await specs for new devices task.

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content = '<div class="card-wrapper hidden pointer" id="devicesCard-' + record.get('id') + '">' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('device') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('mac') + '</div>' +
                    '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('status') + '</div>' +
                    '<div class="img-row"><img src="' + record.get('image') + '"></div>' +
                    '<div class="card-icon-row">' +
                    '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editDevice" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeDevice-' + record.get('id') + '" class="card-icon" data-callback="removeDevice" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>';
                return {
                    rowBody: content
                };
            }
        }];
        this.callParent();
    }
})
