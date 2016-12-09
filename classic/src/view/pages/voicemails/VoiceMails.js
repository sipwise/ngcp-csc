Ext.define('NgcpCsc.view.pages.voicemails.VoiceMails', {
    extend: 'Ext.panel.Panel',

    xtype: 'voicemails',

    viewModel: 'voicemails',

    controller: 'voicemails',

    title: Ngcp.csc.locales.voicemails.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    initComponent: function() {
        var grid = Ext.create('NgcpCsc.view.pages.voicemails.VoiceMailsGrid', {
            bind: {
                title: '{month_summary}'
            }
        });

        this.items = [{
            userCls: 'big-30 small-100 white-box',
            defaults: {
                padding: 20
            },
            items: [{
                items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
                    _linkedStoreId: 'VoiceMails',
                    _isNested: true
                }), {
                    padding: '20 0 0 0',
                    html: Ngcp.csc.locales.voicemails.by_months[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'container',
                    bind: '<div class="link">{month_summary}</div>'
                }]
            }, {
                items: [{
                    html: Ngcp.csc.locales.voicemails.settings.title[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{email}',
                    width: '98%',
                    fieldLabel: Ngcp.csc.locales.voicemails.settings.description[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'checkbox',
                    bind: '{attach_rec}',
                    boxLabel: Ngcp.csc.locales.voicemails.settings.attach_recording[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'numberfield',
                    width: '98%',
                    labelAlign: 'left',
                    labelWidth: 60,
                    hideTrigger: true,
                    maxValue: 9999,
                    bind: '{pin}',
                    fieldLabel: Ngcp.csc.locales.voicemails.settings.pin[localStorage.getItem('languageSelected')]
                }, {
                    html: Ngcp.csc.locales.voicemails.settings.pin_instructions[localStorage.getItem('languageSelected')]
                }, {
                    margin: '10 0 0 0',
                    items: [{
                        text: Ngcp.csc.locales.common.save_settings[localStorage.getItem('languageSelected')],
                        xtype: 'button',
                        width: '100%',
                        handler: 'saveSettings'
                    }]
                }]
            }]
        }, {
            userCls: 'big-70 small-100 white-box',
            padding: 10,
            items: [{
                height: 60,
                padding: '20 0 5 20',
                html: Ngcp.csc.locales.voicemails.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="voicemails-heading">{0} {1}</div>', Ngcp.csc.locales.voicemails.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, grid]
        }];
        this.callParent();
    }
});
