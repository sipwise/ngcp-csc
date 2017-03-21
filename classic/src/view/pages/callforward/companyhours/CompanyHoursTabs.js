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

    frame: true,

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    initComponent: function () {

        this.items = [{
            title: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')],
            id: 'companyhours-tab-everybody',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit companyhours-edit-everybody',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.companyhours.CompanyHoursMainForm', {
                    _prefix: 'everybody-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            title: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
            id: 'companyhours-tab-listA',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit companyhours-edit-listA',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.companyhours.CompanyHoursMainForm', {
                    _prefix: 'listA-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            title: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
            id: 'companyhours-tab-listB',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit companyhours-edit-listB',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.companyhours.CompanyHoursMainForm', {
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
