Ext.define('NgcpCsc.view.pages.pbxconfig.devices.Devices', {
    extend: 'Ext.panel.Panel',

    xtype: 'devices',

    viewModel: 'devices',

    controller: 'devices',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-70 small-100',
        items: [{
            xtype: 'devices-grid'
        }, {
            margin: 10,
            xtype: 'button',
            reference:'addNewBtn',
            text: Ngcp.csc.locales.pbxconfig.add_new_device[localStorage.getItem('languageSelected')]
            // ,handler: 'addDevice'
        }]
    }]
});
