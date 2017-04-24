Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // What's done:
    //  TODO: 1. Reorder menu to groups, seats, devices order
    //  TODO: 2. Map out the data flow, see workfront docs
    //  TODO: 3. Plan data store merge implementation
    //  TODO: 4. Plan out what needs validation, and is required
    //  TODO: 5. Implement validation in view and controller
    //
    // What's remaining:
    //  TODO: 6. Bottom of card gets cut off in seats when creating new, might
    //     also be happening in other modules. Investigate and fix
    //  TODO: 7. Fix bug in Groups module, where hunt 'for' label does not get
    //     extra margin-top when saved with enter, only with button
    //  TODO: 8. Implement store merge as per Cvenusinos suggestion:
    //     TODO: a. introduce in Groups data/model a unique id field (was already there)
    //     TODO: b. change seat data to have the groups field as array of group ids
    //     TODO: c. where you assign the value of groups label in seat card, you have to
    //        iterate&find the records in Groups store which have the ids of
    //        groups field in seat record, and extract the names
    //     TODO: d. as for the tagfield, you have to use Groups storeDONE
    //     TODO: e. define valueField and displayField using fields which exists in
    //        group model (id & name for example)
    //     TODO: f. if the store has autoLoad: true (=dropdown populated),
    //        binding the groups field in seat model to the array of ids should
    //        automatically display the selected group names

    // NOTE: regarding f, I don't think I can do that with this module having binding
    // issues with rowwidget, and even if I could how would I reference that when main
    // store for tagfield is set to a different store than seats?
    // NOTE: the moment I change "Development" to "2" in seats.json, I get invalid json
    // error. Other values I can change name of without problem

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
