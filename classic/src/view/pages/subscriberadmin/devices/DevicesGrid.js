Ext.define('NgcpCsc.view.pages.devices.DevicesGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'devices-grid',

    reference: 'devicesGrid',

    store: 'Devices',

    cls: 'card-grid',

    listeners: {
        click: 'onIconClicked',
        element: 'el',
        delegate: 'div.card-icon, div.number-circle'
    },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false
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
        this.plugins = [{
            ptype: 'rowexpander',
            selectRowOnExpand: false,
            expandOnDblClick: true,
            id: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.subscriberadmin.device_profile[localStorage.getItem('languageSelected')] + '</b>: {device} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')] + '</b>: {mac} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')] + '</b>: {extension} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')] + '</b>: {status} </div>',
                '<div class="img-row"><img src="{image}">',
                '<tpl for="destinations">', // interrogate the kids property within the data
                '<div id="{id}" class="number-circle pointer" data-callback="editDevice" data-destination="{order}" style="top:{position.top};left:{position.left}">{order}</div>',
                '</tpl>',
                '</div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon" data-callback="editDevice"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="removeDevice"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '</div></div>'
            )
        }];
        this.callParent();
    }
})
