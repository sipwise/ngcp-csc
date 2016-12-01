Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        defaults: {
            padding: 0,
            collapsible: true,
            collapsed: !Ext.os.is.Desktop
        },
        items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
            _linkedStoreId: 'Calls'
        }), {
            title: Ngcp.csc.locales.voicemails.settings.title[localStorage.getItem('languageSelected')],
            xtype: 'core-container',
            items:[{
                xtype:'form',
                padding: 20,
                defaults:{
                    width: '100%',
                },
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{settings.email}',
                    fieldLabel: Ngcp.csc.locales.voicemails.settings.description[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'checkbox',
                    bind: '{settings.attach_rec}',
                    boxLabel: Ngcp.csc.locales.voicemails.settings.attach_recording[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'numberfield',
                    labelAlign: 'left',
                    labelWidth: 60,
                    hideTrigger: true,
                    maxValue: 9999,
                    bind: '{settings.pin}',
                    fieldLabel: Ngcp.csc.locales.voicemails.settings.pin[localStorage.getItem('languageSelected')]
                }, {
                    html: Ngcp.csc.locales.voicemails.settings.pin_instructions[localStorage.getItem('languageSelected')]
                }, {
                    margin: '10 0 0 0',
                    items: [{
                        text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                        xtype: 'button',
                        width: '100%',
                        handler: 'saveSettings'
                    }]
                }]
            }]
        }]
    }, {
        xtype: 'calls-grid',
        userCls: 'big-70 small-100'
    }]
})
