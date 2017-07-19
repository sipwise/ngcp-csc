Ext.define('NgcpCsc.view.pages.callforward.CallForwardTab', {
    extend: 'Ext.tab.Panel',

    xtype: 'cftab',

    name: 'cfTab',

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    _tabId: null,

    _secondprefix: null,

    listeners: {
        show: 'onTabRendered'
    },

    initComponent: function () {

        this.items = [{
            title: Ngcp.csc.locales.callforward.from[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')],
            id: this._tabId + '-tab-everybody',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _isEverybody: true,
                    _firstprefix: this._firstPrefixes[0],
                    _secondprefix: this._secondprefix

                })
            ]
        }]

        this.callParent();
    }

});
