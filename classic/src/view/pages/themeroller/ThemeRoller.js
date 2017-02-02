Ext.define('NgcpCsc.view.pages.themeroller.ThemeRoller', {
    extend: 'Ext.form.Panel',

    xtype: 'themeroller',

    viewModel: 'themeroller',

    controller: 'themeroller',

    items: [{
        defaults: {
            ui:'core-container',
            collapsible: true,
            collapsed: false,
            layout: 'responsivecolumn',
            margin:10,
            defaults:{
                padding: 20
            }
        },
        items: [{
            title: Ngcp.csc.locales.themeroller.first_section_title[localStorage.getItem('languageSelected')],
            items: [{
                userCls: 'big-66 small-100',
                items: [{
                    xtype: 'container',
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'colorfield',
                        fieldLabel: 'Base color',
                        bind: '{basecolor}',
                        listeners: {
                            change: 'applyTheme'
                        }
                    }, {
                        xtype: 'colorselector',
                        hidden: true
                    }]
                }, {
                    xtype: 'container',
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'colorfield',
                        fieldLabel: 'Font color',
                        bind: '{fontcolor}',
                        listeners: {
                            change: 'applyTheme'
                        }
                    }, {
                        xtype: 'colorselector',
                        hidden: true
                    }]
                }, {
                    xtype: 'container',
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'colorfield',
                        fieldLabel: 'Body bgcolor',
                        bind: '{bodybgcolor}',
                        listeners: {
                            change: 'applyTheme'
                        }
                    }, {
                        xtype: 'colorselector',
                        hidden: true
                    }]
                }, {
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    defaults: {
                        xtype: 'button',
                        flex: 1
                    },
                    items: [{
                        text: 'reset',
                        handler: 'resetTheme',
                        margin: '0 5 0 0'
                    }, {
                        text: 'save',
                        handler: 'saveTheme'
                    }]
                }]
            }]
        }, {
            title: Ngcp.csc.locales.themeroller.second_section_title[localStorage.getItem('languageSelected')],
            items: [{
                userCls: 'big-66 small-100',
                defaults: {
                    width: '100%',
                    listeners: {
                        change: 'applyTheme'
                    }
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: Ngcp.csc.locales.themeroller.font_family[localStorage.getItem('languageSelected')],
                    bind: '{fontfamily}'
                }, {
                    xtype: 'combo',
                    fieldLabel: Ngcp.csc.locales.themeroller.font_weight[localStorage.getItem('languageSelected')],
                    bind: '{fontweight}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id'],
                        data: [{
                            "id": "normal"
                        }, {
                            "id": "bold"
                        }]
                    }),
                    valueField: 'id',
                    displayField: 'id'
                }, {
                    xtype: 'numberfield',
                    minValue: 6,
                    editable: false,
                    bind: '{fontsize}',
                    fieldLabel: Ngcp.csc.locales.themeroller.font_size[localStorage.getItem('languageSelected')]
                }, {
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    defaults: {
                        xtype: 'button',
                        flex: 1
                    },
                    items: [{
                        text: 'reset',
                        handler: 'resetTheme',
                        margin: '0 5 0 0'
                    }, {
                        text: 'save',
                        handler: 'saveTheme'
                    }]
                }]
            }]
        }, {
            title: Ngcp.csc.locales.themeroller.third_section_title[localStorage.getItem('languageSelected')],
            items: [{
                userCls: 'big-66 small-100',
                defaults: {
                    width: '100%'
                },
                items: [{
                    xtype: 'filefield',
                    fieldLabel: Ngcp.csc.locales.themeroller.logo[localStorage.getItem('languageSelected')],
                    reference: 'logoField',
                    listeners: {
                        change: 'toggleLogo'
                    }
                }, {
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    defaults: {
                        xtype: 'button',
                        flex: 1
                    },
                    items: [{
                        text: 'reset',
                        handler: 'resetTheme',
                        margin: '0 5 0 0'
                    }, {
                        text: 'save',
                        handler: 'saveTheme'
                    }]
                }]
            }]
        }]
    }]
});
