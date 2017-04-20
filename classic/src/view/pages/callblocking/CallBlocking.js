Ext.define('NgcpCsc.view.pages.callblocking.CallBlocking', {
    extend: 'Ext.panel.Panel',

    xtype: 'callblocking',

    viewModel: 'callblocking',

    controller: 'callblocking',

    // TODO: 1. Change toggle to "Allow [TOGGLE BUTTON] block" for Outg/Inc
    // TODO: 2. Change toggle to "Show own number [TOGGLE BUTTON] hide own
    //          number" for Privacy

    initComponent: function() {
        var instructionText = window.location.hash === '#callblocking/incoming' ? Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')] : Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')];

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'callblocking-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.mode[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0',
                    hidden: !this._displayIncomingOutgoingSection
                }, {
                    items: [{
                        xtype: 'segmentedbutton',
                        allowMultiple: false,
                        hidden: !this._displayIncomingOutgoingSection,
                        bind: {
                            value: '{block_mode}'
                        },
                        defaults: {
                            handler: 'clickAllowModeButton'
                        },
                        items: [{
                            text: Ngcp.csc.locales.callblocking.allow[localStorage.getItem('languageSelected')],
                            value: 'allow'
                        }, {
                            text: Ngcp.csc.locales.callblocking.block[localStorage.getItem('languageSelected')],
                            value: 'block'
                        }]
                    }]
                }, {
                    // TODO: Need to be persistent, so maybe use a vm value with
                    // fa classes stored, and bind to that. Change classes in
                    // toggleHandler controller
                    xtype: 'button',
                    iconCls: Ngcp.csc.icons.toggle.on2x,
                    iconAlign: 'center',
                    tooltip: Ngcp.csc.locales.callblocking.mode[localStorage.getItem('languageSelected')],
                    enableToggle: true,
                    width: 60
                    // toggleHandler: 'toggleOutIncButton',
                }, {
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.hide_own[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0',
                    hidden: !this._displayPrivacySection
                }, {
                    items: [{
                        xtype: 'segmentedbutton',
                        allowMultiple: false,
                        hidden: !this._displayPrivacySection,
                        bind: {
                            value: '{hide_mode}'
                        },
                        defaults: {
                            handler: 'clickHideModeButton'
                        },
                        items: [{
                            text: Ngcp.csc.locales.callblocking.on[localStorage.getItem('languageSelected')],
                            value: 'on'
                        }, {
                            text: Ngcp.csc.locales.callblocking.off[localStorage.getItem('languageSelected')],
                            value: 'off'
                        }]
                    }]
                }, {
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.add_number[localStorage.getItem('languageSelected')],
                    margin: '20 0 10 0',
                    hidden: !this._displayIncomingOutgoingSection
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    hidden: !this._displayIncomingOutgoingSection,
                    margin: '0 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        width: 300,
                        bind: '{new_number}',
                        height: 35,
                        listeners: {
                            specialkey: 'onEnterPressed'
                        }
                    }, {
                        xtype: 'button',
                        height: 35,
                        margin: '0 0 0 10',
                        text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                        handler: 'addNewNumber'
                    }]
                }, {
                    xtype: 'container',
                    html: instructionText,
                    hidden: !this._displayIncomingOutgoingSection
                }]
            }]
        }];

        this.callParent();
    }
});
