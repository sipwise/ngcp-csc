Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'Ext.panel.Panel',

    xtype: 'incoming',

    viewModel: 'incoming',

    requires: [ // TODO: Check if we can remove
        'Ext.form.FieldContainer',
        'Ext.form.field.Radio'
    ],

    controller: 'incoming',

    // TODO: Rename/change main model and store
    // TODO: Change layout

    initComponent: function() {
        var incomingGrid = Ext.create('NgcpCsc.view.pages.callblocking.incoming.IncomingGrid');

        this.items = [{
            xtype:'core-container',
            items:[{
                height: 60,
                padding: '5 0 0 0',
                html: Ext.String.format('<div class="callbarring-heading">{0} {1}</div>', Ngcp.csc.locales.callbarring.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, {
                layout: 'responsivecolumn',
                xtype: 'container',
                items: [{
                    userCls: 'big-50 small-100',
                    title:Ngcp.csc.locales.callbarring.incoming_calls[localStorage.getItem('languageSelected')],
                    items: [{
                            xtype: 'fieldcontainer',
                            defaultType: 'radiofield',
                            items: [{
                                boxLabel: Ngcp.csc.locales.callbarring.allow_everything[localStorage.getItem('languageSelected')],
                                name: 'incoming',
                                inputValue: 'incoming-allow',
                                id: 'incoming1',
                                bind: '{callbarring.block_in_mode}'
                            }, {
                                boxLabel: Ngcp.csc.locales.callbarring.block_everything[localStorage.getItem('languageSelected')],
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
                            bind: '{callbarring.new_in_number}',
                            fieldLabel: Ngcp.csc.locales.callbarring.new_entry[localStorage.getItem('languageSelected')].toLowerCase(),
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
                                text:  Ngcp.csc.locales.callbarring.add_number[localStorage.getItem('languageSelected')].toLowerCase(),
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
                            html: Ngcp.csc.locales.callbarring.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callbarring.new_entry_anonymous[localStorage.getItem('languageSelected')]
                        }
                    ]
                }]
            }]
        }];
        this.callParent();
    }
});
