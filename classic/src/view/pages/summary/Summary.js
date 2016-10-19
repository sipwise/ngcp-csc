Ext.define('NgcpCsc.view.pages.summary.Summary', {
    extend: 'Ext.panel.Panel',

    xtype: 'summary',

    viewModel: 'summary',

    controller: 'summary',

    layout: 'fit',

    title: Ngcp.csc.locales.summary.title[localStorage.getItem('languageSelected')],

    layout: 'hbox',

    defaults: {
        flex: 1,
        padding: 10
    },

    items: [{
        flex: 3,
        padding: 0,
        items: [{
            layout: 'fit',
            xtype: 'calls',
            _isDesktopSection: true
        }]
    }, {
        defaults: {
            editable: false,
            xtype: 'textfield',
            labelAlign: 'top',
            padding: '0 20 0 20',
            width: '90%'
        },
        items: [{
            fieldLabel: Ngcp.csc.locales.summary.account_balance[localStorage.getItem('languageSelected')],
            bind: {
                value: '{initial_balance}',
                hidden: '{checkInitialBalance}',
            }
        }, {
            fieldLabel: Ngcp.csc.locales.summary.clients[localStorage.getItem('languageSelected')],
            bind: {
                value: '{clients_total_count} ' + Ngcp.csc.locales.summary.clients_label[localStorage.getItem('languageSelected')]
            }
        }, {
            fieldLabel: Ngcp.csc.locales.summary.new_voicemails[localStorage.getItem('languageSelected')],
            bind: {
                value: '{checkVoiceMails}'
            }
        }, {
            xtype: 'container',
            height: 40,
            padding: 10,
            html: Ext.String.format('<div class="link">{0}</div>', Ngcp.csc.locales.summary.all_voicemails[localStorage.getItem('languageSelected')]),
            listeners: {
                click: {
                    element: 'el',
                    fn: 'showAllVoicemails'
                }
            }
        }]
    }, {
        padding: 20,
        items: [{
            html: Ngcp.csc.locales.summary.call_forwards[localStorage.getItem('languageSelected')]
        }, {
            padding: 5,
            bind: {
                html: '{checkCallFwd}'
            }
        }, {
            xtype: 'container',
            height: 40,
            padding: 10,
            html: Ext.String.format('<div class="link">{0}</div>', Ngcp.csc.locales.summary.reminder[localStorage.getItem('languageSelected')]),
            listeners: {
                click: {
                    element: 'el',
                    fn: 'showCallForward'
                }
            }
        }, {
            html: Ngcp.csc.locales.summary.clients[localStorage.getItem('languageSelected')]
        }, {

            padding: 5,
            bind: {
                html: '{checkReminder}'
            }
        }, {
            xtype: 'container',
            height: 40,
            padding: 10,
            html: Ext.String.format('<div class="link">{0}</div>', Ngcp.csc.locales.summary.reminder[localStorage.getItem('languageSelected')]),
            listeners: {
                click: {
                    element: 'el',
                    fn: 'showSettings'
                }
            }
        }]
    }]
});
