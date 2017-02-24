Ext.define('NgcpCsc.view.pages.pbxconfig.groups.Groups', {
    extend: 'Ext.panel.Panel',

    xtype: 'groups',

    viewModel: 'groups',

    controller: 'groups',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-70 small-100',
        items: [{
            xtype: 'groups-grid'
        }, {
            margin: 10,
            xtype: 'button',
            reference:'addNewBtn',
            text: Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')]
            // ,handler: 'addGroup'
        }]
    }]
});
