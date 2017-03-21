Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    // DONE: 1. Change from bold to normal font weight
    // DONE: 2. Remove bullets from lists and emptyText renderer
    // DONE: 3. Add cursor pointer to sourceset/timeset grids
    // DONE: 4. Autofocus on bottom list A/B row when add new
    // DONE: 5. Adjust to NgcpCsc.view.core.GridCards and card-grid layout
    // TODO: 6. Implement saveDestinationToStore() validity check for number
    // TODO: 7. Implement onEnterPressed for '[offline|online|busy]SaveButton'
    // TODO: 8. Split into submodules that with segmented buttons for now
    // TODO: 9. Implement timeset text and icon ("For calls during always ...")
    // TODO: 10. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 11. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 12. Implement tabs
    // TODO: 13. Implement ability to change List A/List B name
    // TODO: 14. Implement clickable icons in tabs
    // TODO: 15. Place sourceset grid topmost in tab panel, and toggle with icon
    // TODO X. Remember to implement icons with the new formatter

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'callforwardmainform'
            }]
        }];
        this.callParent();
    }

});
