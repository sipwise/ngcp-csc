Ext.define('NgcpCsc.view.pages.voicemails.VoiceMails', {
    extend: 'Ext.panel.Panel',

    xtype: 'voicemails',

    viewModel: 'voicemails',

    controller: 'voicemails',

    scrollable: true,

    title: Ngcp.csc.locales.voicemails.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    initComponent: function() {
        // TODO: Implement fixed column size for the card section
        // TODO: Adjust responsiveness of cards
        // TODO: Create formula for {time} value (displayed in VoiceMailsTpl)
        // to pre-render it in right format
        this.items = [{
            xtype: 'voicemails-tpl'
        }, {
            userCls: 'big-30 small-100',
            defaults: {
                cls: 'white-box reduced-margin',
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
        }];
        this.callParent();
    }
});
