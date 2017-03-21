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
            id: 'afterhours-tab-lista',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-edit-lista',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
                    _prefix: 'lista-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }, {
            title: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
            id: 'afterhours-tab-listb',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-edit-listb',
            iconAlign: 'right',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
                    _prefix: 'listb-'
                })
            ],
            listeners: {
                activate: 'onTabClicked'
            }
        }]

        this.callParent();
    }

});
