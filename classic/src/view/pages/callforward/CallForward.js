Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

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
