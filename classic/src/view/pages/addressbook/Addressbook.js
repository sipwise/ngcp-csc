Ext.define('NgcpCsc.view.pages.addressbook.Addressbook', {
    extend: 'Ext.panel.Panel',

    xtype: 'addressbook',

    controller: 'addressbook',

    viewType: 'addressbook',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    // --CVENUSINO-- Todos from out talk on Nov 3 --CVENUSINO--
    // DONE: 1. Kitchen sink example to expand row and edit fields
    // TODO: 2. Set a flag in search widget for display dates true/false
    // TODO: 3. Create "create contact" widget
    // --CVENUSINO-- --CVENUSINO-- --CVENUSINO-- --CVENUSINO--

    initComponent: function() {
        var addressbookGrid = Ext.create('NgcpCsc.view.pages.addressbook.AddressbookGrid', {
        });

        this.setTitle(Ngcp.csc.locales.addressbook.title[localStorage.getItem('languageSelected')]);

        this.items = [{
            flex: 4,
            defaults: {
                padding: 20
            },
            items: [{
                    html: Ngcp.csc.locales.addressbook.subtitle[localStorage.getItem('languageSelected')]
                }, {
                    height: 60,
                    padding: '5 0 0 20',
                    html: Ext.String.format('<div class="addressbook-heading">{0} {1}</div>', Ngcp.csc.locales.addressbook.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
                },
                addressbookGrid, {
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
        },
        {
            flex: 1,
            xtype: 'gridfilters',
            _linkedStoreId: 'Addressbook'
        }
        ];
        this.callParent();
    }
});
