Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    // viewModel: 'devices', // TODO: Create PbxConfigModel.js
    // controller: 'devices', // TODO: Create PbxConfigController.js

    // TODO: 1. Based on CallBlocking module, plan out how you can consolidate
    // these pbx modules better. Incl a list of all vm values
    // TODO: 2. Start with consolidating vm values into one vm, creating one
    // grid view, and call the grid from inside the pbx modules

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'devices-tbar', // TODO: change to general pbx tbar ui
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
                    // ,handler: 'addDevice' // TODO: needs to go to central controller with check for view
                }]
            }]
        }];

        this.items = [
            devicesGrid
        ];

        this.callParent();
    }
});
