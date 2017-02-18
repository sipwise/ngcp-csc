Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
    extend: 'Ext.panel.Panel',

    xtype: 'outgoing',

    viewModel: 'outgoing',

    controller: 'outgoing',

    initComponent: function() {
        var outgoingGrid = Ext.create('NgcpCsc.view.pages.callblocking.outgoing.OutgoingGrid');

        this.items = [{
            xtype:'core-container',
            items:[{
                height: 60,
                padding: '5 0 0 0',
                html: Ext.String.format('<div class="callblocking-heading">{0} {1}</div>', Ngcp.csc.locales.callblocking.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, {
                layout: 'responsivecolumn',
                xtype: 'container',
                items: [{
                    userCls: 'big-50 small-100',
                    title: Ngcp.csc.locales.callblocking.outgoing_calls[localStorage.getItem('languageSelected')],
                    items: [{
                            xtype: 'fieldcontainer',
                            defaultType: 'radiofield',
                            items: [{
                                boxLabel: Ngcp.csc.locales.callblocking.allow_everything[localStorage.getItem('languageSelected')],
                                name: 'outgoing',
                                inputValue: 'outgoing-allow',
                                id: 'outgoing1',
                                bind: '{callblocking.block_out_mode}'
                            }, {
                                boxLabel: Ngcp.csc.locales.callblocking.block_everything[localStorage.getItem('languageSelected')],
                                name: 'outgoing',
                                inputValue: 'outgoing-block',
                                id: 'outgoing2'
                            }]
                        }, {
                            layout: 'hbox',
                            margin: '0 0 0 5',
                            defaults: {
                                xtype: 'button'
                            },
                            items: [{
                                text: Ngcp.csc.locales.common.save_settings[localStorage.getItem('languageSelected')],
                                margin: '0 0 20 0',
                                handler: 'saveBarrSettings'
                            }]
                        },
                        outgoingGrid, {
                            flex: 1,
                            defaults: {
                                padding: '0 20 0 20'
                            }
                        }, {
                            xtype: 'textfield',
                            id: 'outgoing-new-enter',
                            padding: '10 0 0 10',
                            bind: '{callblocking.new_out_number}',
                            fieldLabel: Ngcp.csc.locales.callblocking.new_entry[localStorage.getItem('languageSelected')].toLowerCase(),
                            listeners: {
                                specialKey: 'onEnterPressed'
                            }
                        }, {
                            layout: 'hbox',
                            margin: '0 0 0 5',
                            defaults: {
                                xtype: 'button'
                            },
                            items: [{
                                text:  Ngcp.csc.locales.callblocking.add_number[localStorage.getItem('languageSelected')].toLowerCase(),
                                margin: '10 0 20 0',
                                id: 'outgoing-new-btn',
                                listeners: {
                                    click: {
                                        element: 'el',
                                        fn: 'saveNumber'
                                    }
                                }
                            }]
                        }, {
                            xtype: 'container',
                            padding: '0 0 10 10',
                            html: Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')]
                        }
                    ]
                }]
            }]
        }];
        this.callParent();
    }
});
