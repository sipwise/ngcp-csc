Ext.define('NgcpCsc.view.pages.callforward.CallForwardTab', {
    extend: 'Ext.tab.Panel',

    xtype: 'cftab',

    name: 'cfTab',

    // listeners: {
    //     click: {
    //         fn: 'onEditClicked',
    //         element: 'el',
    //         delegate: '.cf-edit'
    //     }
    // },

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    _tabId: null,

    _secondprefix: null,

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
            ],
            listeners: {
            //    activate: 'onTabClicked'
            }
        }/*, {
            bind: {
                title: Ngcp.csc.locales.callforward.from[localStorage.getItem('languageSelected')] + '{source_lista_title}'
            },
            id: this._tabId + '-tab-listA',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _firstprefix: this._firstPrefixes[1],
                    _secondprefix: this._secondprefix
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            bind: {
                title: Ngcp.csc.locales.callforward.from[localStorage.getItem('languageSelected')] + '{source_listb_title}'
            },
            id: this._tabId + '-tab-listB',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _firstprefix: this._firstPrefixes[2],
                    _secondprefix: this._secondprefix
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }*/]

        this.callParent();
    }

});
