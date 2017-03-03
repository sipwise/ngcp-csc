Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // DONE: 1. Based on CallBlocking module, plan out how you can consolidate
    // these pbx modules better. Incl a list of all vm values.
    //       - vm was empty. create new one for inline editing/"add new" i needed
    // DONE: 2. Start with consolidating vm values into one vm, creating one
    // grid view, and call the grid from inside the pbx modules
    // DONE: 3. Clean up controller
    // DONE: 4. Consolidate controller
    // DONE: 5. Delete superfluous controllers and scss
    // TODO: 6. Remember to uncomment "fashion" in app.json

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
