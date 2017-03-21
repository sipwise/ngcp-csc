Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // TODO: 1. Plan out how to structure tabs with content and extending views
    // TODO: 2. Move mainform content into TabPanel.js, and implement point 1
    // TODO: 3. Fix saveDestinationToStore to also save combos to store
    // TODO: 4. Implement ability to change List A/List B name
    // TODO: 5. Place sourceset grid topmost in tab panel, and toggle with icon
    // TODO: Xa. Remember to implement icons with the new formatter
    // TODO: Xb. Locales all the things

    // initComponent: function () {
    //
    //     this.items = [{
    //         userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
    //         xtype: 'core-container',
    //         items: [{
    //             xtype: 'callforwardmainform'
    //         }]
    //     }];
    //     this.callParent();
    // }

});
