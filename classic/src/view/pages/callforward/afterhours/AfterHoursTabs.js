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

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    initComponent: function () {

        this.items = [{
            title: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')],
            id: 'afterhours-tab-everybody',
            items: [
                Ext.create('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
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
            id: 'afterhours-tab-listA',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listA',
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
            bind: {
                title: '{source_listb_title}'
            },
            id: 'afterhours-tab-listB',
            iconCls: Ngcp.csc.icons.pencil + ' cf-edit edit-listB',
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
