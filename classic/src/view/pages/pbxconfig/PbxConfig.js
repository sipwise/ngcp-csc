Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // TODO: 1. Mock up "click edit button to show textfields" in codepen
    //       - link: http://codepen.io/robee/pen/MpyBdN
    // TODO: 2. Implement mockup into seats case and controller, and test
    // TODO: 3. Adjust, and implement for all submodules when done
    // TODO: X. Remember to uncomment "fashion" in app.json

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'pbxconfig-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    margin: 10,
                    xtype: 'button',
                    reference:'addNewBtn',
                    disabled: true,
                    text: Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')],
                    handler: 'addPbx'
                }]
            }]
        }];

        this.callParent();
    }
});
