Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'Ext.panel.Panel',

    xtype: 'incoming',

    viewModel: 'incoming',

    controller: 'incoming',

    ui: 'callblocking-main',

    layout: 'center',

    // DONE: 1a. Change layout to card right width
    // TODO: 1b. Resolve issue with top: 150
    // TODO: 1c. Fontaweome icon changes
    // TODO: 2. Implement mode and "add number" cards
    // TODO: 3. Structure stores/model differently, in line with others
    // TODO: 4. Switch to rowbody

    initComponent: function() {
        var incomingGrid = Ext.create('NgcpCsc.view.pages.callblocking.incoming.IncomingGrid');

        this.items = [{
            // TODO: layout: 'center' here renders empty content, and at top of
            // doc renders with top: 150
            // layout: 'center',
            margin: Ext.os.is.Desktop ? '-5 0 0 35' : '-5 0 0 15',
            width: Ext.os.is.Desktop ? 810 : '100%',
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
                    title: Ngcp.csc.locales.callblocking.incoming_calls[localStorage.getItem('languageSelected')],
                    items: [{
                            xtype: 'fieldcontainer',
                            defaultType: 'radiofield',
                            items: [{
                                boxLabel: Ngcp.csc.locales.callblocking.allow_everything[localStorage.getItem('languageSelected')],
                                name: 'incoming',
                                inputValue: 'incoming-allow',
                                id: 'incoming1',
                                bind: '{callblocking.block_in_mode}'
                            }, {
                                boxLabel: Ngcp.csc.locales.callblocking.block_everything[localStorage.getItem('languageSelected')],
                                name: 'incoming',
                                inputValue: 'incoming-block',
                                id: 'incoming2'
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
                        incomingGrid, {
                            flex: 1,
                            defaults: {
                                padding: '0 20 0 20'
                            }
                        }, {
                            xtype: 'textfield',
                            id: 'incoming-new-enter',
                            padding: '10 0 0 10',
                            bind: '{callblocking.new_in_number}',
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
                                id: 'incoming-new-btn',
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
