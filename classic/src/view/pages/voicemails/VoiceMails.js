Ext.define('NgcpCsc.view.pages.voicemails.VoiceMails', {
    extend: 'Ext.panel.Panel',

    xtype: 'voicemails',

    viewModel: 'voicemails',

    controller: 'voicemails',

    title: Ngcp.csc.locales.voicemails.title[localStorage.getItem('languageSelected')],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var grid = Ext.create('NgcpCsc.view.pages.voicemails.VoiceMailsGrid', {
            flex: 4,
            bind:{
                title: '{month_summary}'
            }
        });

        this.items = [{
            flex: 4,
            items: [{
                    height: 60,
                    padding: '20 0 5 20',
                    html: Ngcp.csc.locales.voicemails.subtitle[localStorage.getItem('languageSelected')]
                }, {
                    height: 60,
                    padding: '5 0 0 20',
                    html: Ext.String.format('<div class="voicemails-heading">{0} {1}</div>', Ngcp.csc.locales.voicemails.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
                }, {
                xtype: 'voicemails-grid'
            }]
        }, {
            flex: 1,
            defaults: {
                padding: '0 20 0 20'
            },
            items: [{
                    xtype: 'gridfilters',
                    _linkedStoreId: 'VoiceMails'
                }, {
                    padding: '20 0 10 20',
                    html: Ngcp.csc.locales.voicemails.by_months[localStorage.getItem('languageSelected')]
                }, {
                    padding: '0 0 20 40',
                    xtype: 'container',
                    bind: '<div class="link">{month_summary}</div>'
                }, {
                defaults: {
                    padding: '0 20 0 0'
                },
                items: [{
                    html: Ngcp.csc.locales.voicemails.settings.title[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{email}',
                    fieldLabel: Ngcp.csc.locales.voicemails.settings.description[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'checkbox',
                    bind: '{attach_rec}',
                    boxLabel: Ngcp.csc.locales.voicemails.settings.attach_recording[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'numberfield',
                    width: 120,
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
                        text: Ngcp.csc.locales.voicemails.settings.save[localStorage.getItem('languageSelected')],
                        xtype: 'button',
                        width: '100%',
                        handler: 'saveSettings'
                    }]
                }]
            }]
        }];
        this.callParent();
    }
});
