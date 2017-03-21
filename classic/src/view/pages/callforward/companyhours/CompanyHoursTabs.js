Ext.define('NgcpCsc.view.pages.callforward.companyhours.CompanyHoursTabs', {
    extend: 'Ext.tab.Panel',

    xtype: 'companyhourstabs',

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
            id: 'companyhours-tab-everybody',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _firstprefix: 'everybody-',
                    _secondprefix: 'companyHours-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            bind: {
                title: '{source_lista_title}'
            },
            id: 'companyhours-tab-listA',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listA',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _firstprefix: 'listA-',
                    _secondprefix: 'companyHours-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            bind: {
                title: '{source_listb_title}'
            },
            id: 'companyhours-tab-listB',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listB',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                    _firstprefix: 'listB-',
                    _secondprefix: 'companyHours-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }]

        this.callParent();
    }

});
