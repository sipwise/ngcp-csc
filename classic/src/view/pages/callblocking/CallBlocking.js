Ext.define('NgcpCsc.view.pages.callblocking.CallBlocking', {
    extend: 'Ext.panel.Panel',

    xtype: 'callblocking',

    viewModel: 'callblocking',

    controller: 'callblocking',

    // DONE: 1. Visually implement "Allow [TOGGLE BUTTON] block" for Outg/Inc
    // DONE: 2. Visually implement "Show own number [TOGGLE BUTTON] hide own
    //          number" for Privacy
    // TODO: 3. Implement css and classes
    // TODO: 4. Implement controllers and bind to vm values

    initComponent: function() {
        var instructionText = window.location.hash === '#callblocking/incoming' ? Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')] : Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')];
        var enabledState = '{' + this._vmPrefix + 'block_mode}' ? 'on' : 'off';

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
                        xtype: 'panel',
                        hidden: !this._displayIncomingOutgoingSection,
                        items: [{
                            hidden: !this._displayIncomingSection,
                            html: '<div id="toggleBlockCalls-Incoming" class="toggle-icon" data-callback="toggleAllowBlockIncoming">' +
                            '<span style="margin-right: 10px;">Allow</span>' +
                            '<i id="iconAllowBlock-Incoming" class="' + Ngcp.csc.icons.toggle[enabledState + '2x'] + ' green" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
                            '<span style="margin-left: 10px;">block</span>' +
                            '</div>'
                        }, {
                            hidden: !this._displayOutgoingSection,
                            html: '<div id="toggleBlockCalls-Outgoing" class="toggle-icon" data-callback="toggleAllowBlockOutgoing">' +
                            '<span style="margin-right: 10px;">Allow</span>' +
                            '<i id="iconAllowBlock-Outgoing" class="' + Ngcp.csc.icons.toggle[enabledState + '2x'] + ' green" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
                            '<span style="margin-left: 10px;">block</span>' +
                            '</div>'
                        }]
                    }]
                }, {
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.hide_own[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0',
                    hidden: !this._displayPrivacySection
                }, {
                    items: [{
                        xtype: 'panel',
                        hidden: !this._displayPrivacySection,
                        items: [{
                            html: '<div id="toggleBlockCalls-Incoming" class="toggle-icon" data-callback="toggleAllowBlockIncoming">' +
                            '<span style="margin-right: 10px;">Show own number</span>' +
                            '<i id="iconAllowBlock-Incoming" class="' + Ngcp.csc.icons.toggle[enabledState + '2x'] + ' green" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
                            '<span style="margin-left: 10px;">hide own number</span>' +
                            '</div>'
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
