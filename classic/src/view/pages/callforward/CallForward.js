Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    // TODO: 1. Change from bold to normal font weight
    // TODO: 2. Remove bullets from lists and emptyText renderer
    // TODO: 3. Add cursor pointer to sourceset/timeset grids
    // TODO: 4. Autofocus on bottom list A/B row when add new
    // TODO: 5. Split into submodules that with segmented buttons for now
    // TODO: 6. Implement timeset text and icon ("For calls during always ...")
    // TODO: 7. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 8. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 9. Implement tabs
    // TODO: 10. Implement ability to change List A/List B name
    // TODO: 11. Implement clickable icons in tabs
    // TODO: 12. Place sourceset grid topmost in tab panel, and toggle with icon

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
