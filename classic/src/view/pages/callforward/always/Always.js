Ext.define('NgcpCsc.view.pages.callforward.always.Always', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'always',

    ui: 'cf-mainform',

    viewModel: 'callforward',

    initComponent: function() {

        // This is used to fetch the api data from endpoints initially, and
        // build the other individual grid stores in controller together with
        // needed corresponding data fetched with ajax calls
        var cfInitialStore = Ext.create('NgcpCsc.store.CallForward',{
            storeId: 'CallForwardAlways',
            _type: 'cfu', // NOTE: Can use an array, value would be ['cfu', 'cft']
            autoLoad: true,
            listeners: {
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'alwaystestgrid',
                margin: '50 0 125 0'
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
