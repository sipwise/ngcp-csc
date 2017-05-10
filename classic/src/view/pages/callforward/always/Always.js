Ext.define('NgcpCsc.view.pages.callforward.always.Always', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'always',

    ui: 'cf-mainform',

    viewModel: 'callforward',

    initComponent: function() {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'statusbar',
                reference: 'loadingBar'
            }, {
                xtype: 'panel',
                width: '100%',
                title: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'cftab',
                _tabId: 'always',
                _firstPrefixes: ['everybody-', 'listA-', 'listB-'],
                _secondprefix: 'always-'
            }]
        }];
        this.callParent();
    }

});
