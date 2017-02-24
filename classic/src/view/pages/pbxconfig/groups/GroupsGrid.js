Ext.define('NgcpCsc.view.pages.groups.GroupsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'groups-grid',

    reference: 'groupsGrid',

    store: 'Groups',

    cls: 'card-grid',

    listeners: {
         click: 'onIconClicked',
         element: 'el',
         delegate: 'div.card-icon'
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
        // TODO: 1a. Replace with rowbody
        // TODO: 1b. Check how it looks and behavior
        // TODO: 1c. Implement rowbody controllers based on conversations
        this.plugins = [{
            ptype: 'rowexpander',
            selectRowOnExpand: false,
            expandOnDblClick: false,
            id:'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')] + '</b>: {extension} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')] + '</b>: {hunt_policy} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')] + '</b>: {hunt_timeout} </div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon" data-callback="editGroup"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="removeGroup"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '</div></div>'
            )
        }];
        this.callParent();
    }
})
