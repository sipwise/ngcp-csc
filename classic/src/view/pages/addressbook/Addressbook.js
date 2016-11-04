Ext.define('NgcpCsc.view.pages.addressbook.Addressbook', {
    extend: 'Ext.panel.Panel',

    xtype: 'addressbook',

    controller: 'addressbook',

    viewModel: 'addressbook',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    title: Ngcp.csc.locales.addressbook.title[localStorage.getItem('languageSelected')],

    items : [{
        flex: 3,
        defaults: {
            padding: 20
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
                html: Ngcp.csc.locales.addressbook.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="addressbook-heading">{0} {1}</div>', Ngcp.csc.locales.addressbook.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            },
            {
                xtype: 'addressbook-grid',
                scrollable:true
            }, {
                xtype: 'container',
                anchor: '100%',
                height: 40,
                padding: 10
            }, {
                xtype: 'container',
                id: 'group-firstname',
                height: 40,
                padding: '10 0 10 10',
                html: Ngcp.csc.locales.addressbook.columns.firstname[localStorage.getItem('languageSelected')],
                cls: 'link',
                listeners: {
                    click: {
                        element: 'el',
                        fn: 'changeGroupField'
                    }
                }
            }, {
                xtype: 'container',
                id: 'group-lastname',
                height: 40,
                padding: '10 0 10 10',
                html: Ngcp.csc.locales.addressbook.columns.lastname[localStorage.getItem('languageSelected')],
                cls: 'link',
                listeners: {
                    click: {
                        element: 'el',
                        fn: 'changeGroupField'
                    }
                }
            }, {
                xtype: 'container',
                id: 'group-company',
                height: 40,
                padding: '10 0 10 10',
                html: Ngcp.csc.locales.addressbook.columns.company[localStorage.getItem('languageSelected')],
                cls: 'link',
                listeners: {
                    click: {
                        element: 'el',
                        fn: 'changeGroupField'
                    }
                }
            }
        ]
    }, {
        flex: 1,
        defaults: {
            padding: 20
        },
        items: [{
            //flex: 1,
            xtype: 'gridfilters',
            _linkedStoreId: 'Addressbook',
            _hideDateFilters: true
        }, {
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                focusable:true,
                fieldLabel: 'Name',
                id:'contactName',
                bind: '{selection.name}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Company',
                bind: '{selection.company}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Home',
                bind: '{selection.home}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Office',
                bind: '{selection.office}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Mobile',
                bind: '{selection.mobile}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Fax',
                bind: '{selection.fax}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'E-mail',
                bind: '{selection.e_mail}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Homepage',
                bind: '{selection.homepage}'
            }],
            bind: {
                hidden: '{!selection}'
            }
        },
        {
            layout: 'hbox',
            defaults: {
                xtype: 'button',
                flex: 1,
                bind: {
                    hidden: '{!selection}'
                }
            },
            items: [{
                text: Ngcp.csc.locales.common.revert[localStorage.getItem('languageSelected')],
                margin: '0 5 0 0',
                handler: 'revertChanges'
            }, {
                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                handler: 'saveChanges'
            }]
        }]
    }]
});
