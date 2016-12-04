Ext.define('NgcpCsc.view.pages.huntgroup.HuntGroup', {
    extend: 'Ext.panel.Panel',

    xtype: 'huntgroup',

    viewModel: 'huntgroup',

    controller: 'huntgroup',

    layout: 'responsivecolumn',

    title: Ngcp.csc.locales.huntgroup.title[localStorage.getItem('languageSelected')],

    items : [{
        userCls: 'big-70 small-100 white-box',
        padding:10,
        defaults: {
            padding: 20
        },
        items: [{
                html: Ngcp.csc.locales.huntgroup.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="huntgroup-heading">{0} {1}</div>', Ngcp.csc.locales.huntgroup.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            },
            {
                xtype: 'huntgroup-grid'
            }
        ]
    }, {
        userCls: 'big-30 small-100 white-box',
        defaults: {
            padding: 20
        },
        items: [{
            xtype: 'gridfilters',
            _linkedStoreId: 'HuntGroup',
            _hideDateFilters: true,
            _isNested: true
        }, {
            xtype: 'form',
            reference:'huntGroupForm',
            defaults:{
                xtype: 'textfield',
                width:'100%'
            },
            items: [{
                focusable: true,
                fieldLabel: Ngcp.csc.locales.addressbook.first_name[localStorage.getItem('languageSelected')],
                id: 'huntGroupName',
                bind: '{selection.name}',
                allowBlank: false,
                blankText: Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel: Ngcp.csc.locales.addressbook.last_name[localStorage.getItem('languageSelected')],
                bind: '{selection.extension}',
                blankText: Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                allowBlank: false,
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel:  Ngcp.csc.locales.addressbook.company[localStorage.getItem('languageSelected')],
                bind: '{selection.hunting_policy}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.home[localStorage.getItem('languageSelected')],
                bind: '{selection.serial_hunting_timeout}'
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
