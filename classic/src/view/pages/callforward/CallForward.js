Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // TODO: 1. Replicate AfterHours to CompanyHours (Always done)
    // TODO: 2. Fix controller error removeAll of undefined store
    // TODO: 3. Fix styling to also work after the split to tabs
    // TODO: 4. Fix saveDestinationToStore to also save combos to store
    // TODO: 5. Implement ability to change List A/List B name
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
