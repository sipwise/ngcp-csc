Ext.define('NgcpCsc.view.pages.callforward.always.AlwaysTabs', {
    extend: 'Ext.tab.Panel',

    xtype: 'alwaystabs',

    listeners: {
        click: {
            fn: 'onEditClicked',
            element: 'el',
            delegate: '.cf-edit'
        }
    },

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    initComponent: function () {

        this.items = [{
            title: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')],
            id: 'always-tab-everybody',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.always.AlwaysMainForm', {
                    _prefix: 'everybody-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            bind: {
                title: '{source_lista_title}'
            },
            id: 'always-tab-listA',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listA',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.always.AlwaysMainForm', {
                    _prefix: 'listA-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            bind: {
                title: '{source_listb_title}'
            },
            id: 'always-tab-listB',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listB',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.always.AlwaysMainForm', {
                    _prefix: 'listB-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }]

        this.callParent();
    }

});
