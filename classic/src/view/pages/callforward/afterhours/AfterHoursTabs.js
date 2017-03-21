Ext.define('NgcpCsc.view.pages.callforward.afterhours.AfterHoursTabs', {
    extend: 'Ext.tab.Panel',

    xtype: 'afterhourstabs',

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
            id: 'afterhours-tab-everybody',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-edit-everybody',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
                    _prefix: 'everybody-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            title: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
            id: 'afterhours-tab-listA',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-edit-listA',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
                    _prefix: 'listA-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            title: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
            id: 'afterhours-tab-listB',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-edit-listB',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
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
