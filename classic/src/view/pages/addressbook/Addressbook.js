Ext.define('NgcpCsc.view.pages.addressbook.Addressbook', {
    extend: 'Ext.panel.Panel',

    xtype: 'addressbook',

    controller: 'addressbook',

    viewModel: 'addressbook',

    layout: 'responsivecolumn',

    scrollable: true,

    title: Ngcp.csc.locales.addressbook.title[localStorage.getItem('languageSelected')],

    items : [{
        userCls: 'big-80 small-100 white-box',
        defaults: {
            padding: 20
        },
        scrollable:true,
        items: [{
                html: Ngcp.csc.locales.addressbook.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="addressbook-heading">{0} {1}</div>', Ngcp.csc.locales.addressbook.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            },
            {
                xtype: 'addressbook-grid'
            }
        ]
    }, {
        userCls: 'big-20 small-100 white-box',
        defaults: {
            padding: 20
        },
        items: [{
            xtype: 'gridfilters',
            _linkedStoreId: 'Addressbook',
            _hideDateFilters: true,
            _isNested: true
        }, {
            xtype: 'form',
            reference:'contactForm',
            defaults:{
                xtype: 'textfield'
            },
            items: [{
                focusable:true,
                fieldLabel: 'First name',
                id:'contactFirstName',
                bind: '{selection.firstname}',
                allowBlank:false,
                blankText:Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel: 'Last name',
                bind: '{selection.lastname}',
                blankText:Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                allowBlank:false,
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel: 'Company',
                bind: '{selection.company}'
            }, {
                fieldLabel: 'Home',
                bind: '{selection.home}'
            }, {
                fieldLabel: 'Office',
                bind: '{selection.office}'
            }, {
                fieldLabel: 'Mobile',
                bind: '{selection.mobile}'
            }, {
                fieldLabel: 'Fax',
                bind: '{selection.fax}'
            }, {
                fieldLabel: 'E-mail',
                bind: '{selection.e_mail}'
            }, {
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
                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                margin: '0 5 0 0',
                handler: 'resetChanges'
            }, {
                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                handler: 'saveChanges'
            }]
        }]
    }]
});
