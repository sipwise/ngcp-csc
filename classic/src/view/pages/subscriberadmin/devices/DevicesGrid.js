Ext.define('NgcpCsc.view.pages.devices.DevicesGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'devices-grid',

    reference: 'devicesGrid',

    store: 'Devices',

    cls: 'card-grid',

    listeners: {
         click: 'onIconClicked',
         element: 'el',
         delegate: 'div.card-icon'
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
            id:'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')] + '</b>: {extension} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')] + '</b>: {status} </div>',
                '</div></div>'
            )
        }];
        this.callParent();
    }
})
