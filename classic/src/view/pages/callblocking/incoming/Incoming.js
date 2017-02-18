Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'Ext.panel.Panel',

    xtype: 'incoming',

    viewModel: 'incoming',

    controller: 'incoming',

    // TODO: 1. Locales, add and remove redundant ones
    // TODO: 2. For rowbody cards, make text size in line with conversations
    // number, and centera align green icons
    // TODO: 3. Duplicate new model for outgoing, and alter to work
    // alignment and padding/margin)

    initComponent: function() {

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
                            value: '{incoming.block_in_mode}'
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
                    bind: '{incoming.new_in_number}',
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')]
                }]
            }]
        }];

        this.items = [{
            xtype: 'incoming-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
