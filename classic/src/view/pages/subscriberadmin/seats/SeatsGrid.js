Ext.define('NgcpCsc.view.pages.seats.SeatsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'seats-grid',

    store: 'Seats',

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
            rowBodyTpl: new Ext.XTemplate(
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.name[localStorage.getItem('languageSelected')] + '</b>: {name}</div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')] + '</b>: {extension} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')] + '</b>: {groups} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.pbx_devices[localStorage.getItem('languageSelected')] + '</b>: {pbx_devices} </div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon" data-callback="editSeat"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="removeSeat"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '</div></div>'
            )
        }];
        this.callParent();
    }
})
