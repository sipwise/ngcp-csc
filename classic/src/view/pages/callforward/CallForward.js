Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // TODO: 1. Fix saveDestinationToStore controller to allow all combo opts
    // TODO: 2. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 3. Implement tabs
    // TODO: 4. Implement ability to change List A/List B name
    // TODO: 5. Implement clickable icons in tabs
    // TODO: 6. Place sourceset grid topmost in tab panel, and toggle with icon
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
