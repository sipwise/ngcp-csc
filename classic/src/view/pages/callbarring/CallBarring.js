Ext.define('NgcpCsc.view.pages.callbarring.CallBarring', {
    extend: 'Ext.panel.Panel',

    xtype: 'callbarring',

    viewModel: 'callbarring',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Radio'
    ],

    controller: 'callbarring',

    title: Ngcp.csc.locales.callbarring.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    initComponent: function() {
        var incomingGrid = Ext.create('NgcpCsc.view.pages.callbarring.CallBarringIncomingGrid', {});
        var outgoingGrid = Ext.create('NgcpCsc.view.pages.callbarring.CallBarringOutgoingGrid', {});

        this.items = [{
            height: 60,
            padding: '20 0 5 20',
            html: Ngcp.csc.locales.callbarring.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 60,
            padding: '5 0 0 20',
            html: Ext.String.format('<div class="callbarring-heading">{0} {1}</div>', Ngcp.csc.locales.callbarring.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            xtype: 'container',
            padding: '0 0 0 20',
            items: [{
                anchor: '100%',
                flex: 1,
                html: Ngcp.csc.locales.callbarring.incoming_calls[localStorage.getItem('languageSelected')]
            }, {
                anchor: '100%',
                flex: 1,
                html: Ngcp.csc.locales.callbarring.outgoing_calls[localStorage.getItem('languageSelected')]
            }]
        }, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            xtype: 'container',
            items: [{
                //////////////////////////////////////
                // FLEX BOX BOTTOM LEFT 50% OF SCREEN
                //////////////////////////////////////
                anchor: '100%',
                flex: 1,
                items: [{
                        xtype: 'fieldcontainer',
                        defaultType: 'radiofield',
                        items: [{
                            boxLabel: Ngcp.csc.locales.callbarring.allow_everything[localStorage.getItem('languageSelected')],
                            name: 'incoming',
                            inputValue: 'incoming-allow',
                            id: 'incoming1',
                            bind: '{block_in_mode}'
                        }, {
                            boxLabel: Ngcp.csc.locales.callbarring.block_everything[localStorage.getItem('languageSelected')],
                            name: 'incoming',
                            inputValue: 'incoming-block',
                            id: 'incoming2'
                        }]
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '0 0 10 10',
                        html: Ngcp.csc.locales.callbarring.save_settings[localStorage.getItem('languageSelected')].toLowerCase(),
                        cls: 'link',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'saveBarrSettings'
                            }
                        }
                    },
                    incomingGrid, {
                        flex: 1,
                        defaults: {
                            padding: '0 20 0 20'
                        }
                    }, {
                        xtype: 'textfield',
                        id: 'incoming-new',
                        padding: '10 0 0 10',
                        bind: '{new_in_number}',
                        fieldLabel: Ngcp.csc.locales.callbarring.new_entry[localStorage.getItem('languageSelected')].toLowerCase(),
                        listeners: {
                            specialKey: 'onEnterNewIn'
                        }
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '10 0 10 10',
                        html: Ngcp.csc.locales.callbarring.add_number[localStorage.getItem('languageSelected')].toLowerCase(),
                        cls: 'link',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'saveIncomingNumber'
                            }
                        }
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '0 0 10 10',
                        html: Ngcp.csc.locales.callbarring.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callbarring.new_entry_anonymous[localStorage.getItem('languageSelected')]
                    }
                ]
            }, {
                //////////////////////////////////////
                // FLEX BOX BOTTOM RIGHT 50% OF SCREEN
                //////////////////////////////////////
                anchor: '100%',
                flex: 1,
                items: [{
                        xtype: 'checkboxfield',
                        boxLabel: Ngcp.csc.locales.callbarring.hide_own[localStorage.getItem('languageSelected')].toLowerCase(),
                        name: 'hidebox',
                        bind: '{clir}'
                    }, {
                        xtype: 'fieldcontainer',
                        defaultType: 'radiofield',
                        items: [{
                            boxLabel: Ngcp.csc.locales.callbarring.allow_everything[localStorage.getItem('languageSelected')],
                            name: 'outgoing',
                            inputValue: 'outgoing-allow',
                            id: 'outgoing1',
                            bind: '{block_out_mode}'
                        }, {
                            boxLabel: Ngcp.csc.locales.callbarring.block_everything[localStorage.getItem('languageSelected')],
                            name: 'outgoing',
                            inputValue: 'outgoing-block',
                            id: 'outgoing2'
                        }]
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '0 0 10 10',
                        html: Ngcp.csc.locales.callbarring.save_settings[localStorage.getItem('languageSelected')].toLowerCase(),
                        cls: 'link',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'saveBarrSettings'
                            }
                        }
                    },
                    outgoingGrid, {
                        flex: 1,
                        defaults: {
                            padding: '0 20 0 20'
                        }
                    }, {
                        xtype: 'textfield',
                        id: 'outgoing-new',
                        padding: '10 0 0 10',
                        bind: '{new_out_number}',
                        fieldLabel: Ngcp.csc.locales.callbarring.new_entry[localStorage.getItem('languageSelected')].toLowerCase(),
                        listeners: {
                            specialKey: 'onEnterNewOut'
                        }
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '10 0 10 10',
                        html: Ngcp.csc.locales.callbarring.add_number[localStorage.getItem('languageSelected')].toLowerCase(),
                        cls: 'link',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'saveOutgoingNumber'
                            }
                        }
                    }, {
                        xtype: 'container',
                        height: 40,
                        padding: '0 20 10 10',
                        html: Ngcp.csc.locales.callbarring.new_entry_instructions[localStorage.getItem('languageSelected')]
                    }
                ]
            }]
        }];
        this.callParent();
    }
});
