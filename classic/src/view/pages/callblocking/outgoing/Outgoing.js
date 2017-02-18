Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
    extend: 'Ext.panel.Panel',

    xtype: 'outgoing',

    viewModel: 'outgoing',

    controller: 'outgoing',

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
                            value: '{outgoing.block_out_mode}'
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
                    bind: '{outgoing.new_out_number}',
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')]
                }]
            }]
        }];

        this.items = [{
            xtype: 'outgoing-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
