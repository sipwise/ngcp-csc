Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    // DONE: 1. Change from bold to normal font weight
    // TODO: 2. Remove bullets from lists and emptyText renderer
    // TODO: 3. Add cursor pointer to sourceset/timeset grids
    // TODO: 4. Autofocus on bottom list A/B row when add new
    // TODO: 5. Adjust to NgcpCsc.view.core.GridCards and card-grid layout
    // TODO: 6. Split into submodules that with segmented buttons for now
    // TODO: 7. Implement timeset text and icon ("For calls during always ...")
    // TODO: 8. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 9. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 10. Implement tabs
    // TODO: 11. Implement ability to change List A/List B name
    // TODO: 12. Implement clickable icons in tabs
    // TODO: 13. Place sourceset grid topmost in tab panel, and toggle with icon

    initComponent: function () {

        this.items = [{
            userCls: 'big-70 small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'callforwardmainform'
            }]
        }];
        this.callParent();
    }

});
