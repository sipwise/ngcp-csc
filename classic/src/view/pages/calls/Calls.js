Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    layout: 'responsivecolumn',

    title: Ngcp.csc.locales.calls.section_title[localStorage.getItem('languageSelected')],

    items: [{
        userCls: 'big-30 small-100',
        items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
            _linkedStoreId: 'Calls',
            _callFilters: true
        }), {
            title: Ngcp.csc.locales.settings.title[localStorage.getItem('languageSelected')],
            xtype: 'core-container',
            padding: 0,
            collapsible: true,
            collapsed: !Ext.os.is.Desktop,
            items:[{
                xtype:'form',
                padding: 20,
                defaults:{
                    width: '100%'
                },
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{settings.email}',
                    fieldLabel: Ngcp.csc.locales.settings.description[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'checkbox',
                    bind: '{settings.attach_rec}',
                    boxLabel: Ngcp.csc.locales.settings.attach_recording[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'numberfield',
                    labelAlign: 'left',
                    labelWidth: 60,
                    hideTrigger: true,
                    maxValue: 9999,
                    bind: '{settings.pin}',
                    fieldLabel: Ngcp.csc.locales.settings.pin[localStorage.getItem('languageSelected')]
                }, {
                    html: Ngcp.csc.locales.settings.pin_instructions[localStorage.getItem('languageSelected')]
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
