Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // TODO: 1. Add all new view changes
    // DONE:    a. comboboxes
    // DONE:    b. tagfields
    // DONE:    c. remove unneeded fields/labels
    // DONE:    d. alter existing fields/labels that need changed
    // DONE:    e. implement timeout field and extra labels for hunt policy
    // DONE:    f. change data .json
    // http://examples.sencha.com/extjs/6.2.0/examples/kitchensink/#form-tag
    // DONE:    g. research how to display children nodes for tagfields, or
    //             generate new store based on child nodes
    // DONE:    h. implement display of data for tagfields
    // TODO:    i. implement inline XTemplate/tpl for displaying tagfield
    //             data as comma-separated text
    // DONE:    j. create data and store for primaryNumberPool.json,
    //             aliasNumberPool.json and groupsPool.json
    // TODO: 2. Implement controller logic for the new view changes
    // TODO:    a. implement hide/show logic for hunt policy/timeout changes
    // TODO:    b. implement show/hide logic for rest of new fields/labels
    // TODO:    c. adjust validation controller
    // TODO     d. adjust any other affected controllers
    // TODO: 3. Adjust gridfilters to work with new and adjusted fields
    // TODO:    a. create new controller logic for also filter on children nodes
    //             introduced by groups/aliasnumbers/etc tagfields
    // TODO:    b. implement gridfilter search fields for new fields
    // TODO:    c. adjust logic for rest of new fields
    // TODO: 4. Cleanup and check for missed locales/icons/comments

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
                    reference: 'addNewBtn',
                    bind: {
                        text: '{add_new_button}'
                    },
                    handler: 'addPbx'
                }]
            }]
        }];

        this.callParent();
    }
});
