Ext.define('NgcpCsc.view.pages.callblocking.CallBlocking', {
    extend: 'Ext.panel.Panel',

    xtype: 'callblocking',

    viewModel: 'callblocking',

    controller: 'callblocking',

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
                    html: 'Mode',
                    margin: '0 0 10 0'
                }, {
                    items: [{
                        xtype: 'segmentedbutton',
                        allowMultiple: false,
                        bind: {
                            value: '{block_mode}'
                        },
                        defaults: {
                            handler: 'clickModeButton'
                        },
                        items: [{
                            text: 'Allow',
                            value: 'allow'
                        }, {
                            text: 'Block',
                            value: 'block'
                        }]
                    }]
                }, {
                    userCls: 'callblocking-header',
                    html: 'Add number',
                    margin: '20 0 10 0'
                }, {
                    xtype: 'textfield',
                    width: 300,
                    bind: '{new_number}',
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'container',
                    html: instructionText
                }]
            }]
        }];

        this.callParent();
    }
});
