Ext.define('NgcpCsc.view.pages.pbxconfig.devices.Devices', {
    extend: 'Ext.panel.Panel',

    xtype: 'devices',

    viewModel: 'devices',

    controller: 'devices',

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'devices-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%'
                ,items: [{
                    margin: 10,
                    xtype: 'button',
                    reference:'addNewBtn',
                    disabled: true,
                    text: Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')]
                    // ,handler: 'addDevice'
                }]
            }]
        }];

        this.items = [{
            xtype: 'devices-grid'
        }];

        this.callParent();
    }
});
