Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    layout: 'responsivecolumn',

    scrollable: true,

    // TODO: 1. migrate Fax Spool to the new unified view
    // DONE: 1a. add a custom TPL in CallsGrid.js
    // DONE: 1b. add dummy fax data to calls.json with the call_type defined in call_type.json (data source for the Type filter)
    // DONE: 1c. Style fax card
    // TODO: 1d. Fix filter to also work with fax
    // TODO: 1e. Remove faxspool.json, whole faxspool module (with model and store), and faxspool menu item
    // TODO: 1f. Rename calltypes from cf codes to something else
    // TODO: 2. Create separate task to rename "Calls" to "Unified Inbox", and also consolidate locales
    // TODO: 3. Raise a question regarding whether or not we should reintroduce green top title bar for unified inbox and chat


    items: [{
        userCls: 'big-30 small-100',
        items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
            _linkedStoreId: 'Calls',
            _callFilters: true
        }), {
            title: Ngcp.csc.locales.voicemails.settings.title[localStorage.getItem('languageSelected')],
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
