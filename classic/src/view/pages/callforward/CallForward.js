Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    scrollable: true,

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    initComponent: function () {
        var callForwardTimesetAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-after-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardTimesetAfter.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var callForwardTimesetCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardTimesetCompany.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });

        this.items = [{
            userCls: 'big-30 small-100',
            defaults: {
                padding: 0,
                collapsible: true,
                collapsed: !Ext.os.is.Desktop
            },
            items: [{
                xtype: 'gridfilters',
                _linkedStoreId: 'CallForward',
                _hideDateFilters: true,
                _isNested: true
            }, {
                xtype: 'core-container',
                bind: {
                    title: '{active_widget_form}',
                    hidden: '{after_hours_form}'
                },
                items: [{
                    xtype: 'panel',
                    ui: 'cf-timeset',
                    width: '100%',
                    items: [
                        callForwardTimesetAfterGrid,
                        {
                            layout: 'hbox',
                            width: '100%',
                            margin: '10 0 0 0',
                            defaults: {
                                xtype: 'button',
                                flex: 1
                            },
                            items: [{
                                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                                margin: '0 5 0 0'
                            }, {
                                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                                id: 'resetAfter',
                                handler: 'resetTimesetWidget'
                            }]
                        }
                    ]
                }]
            }, {
                xtype: 'core-container',
                bind: {
                    title: '{active_widget_form}',
                    hidden: '{company_hours_form}'
                },
                items: [{
                    xtype: 'panel',
                    ui: 'cf-timeset',
                    width: '100%',
                    items: [
                        callForwardTimesetCompanyGrid,
                        {
                            layout: 'hbox',
                            width: '100%',
                            margin: '10 0 0 0',
                            defaults: {
                                xtype: 'button',
                                flex: 1
                            },
                            items: [{
                                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                                margin: '0 5 0 0'
                            }, {
                                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                                id: 'resetCompany',
                                handler: 'resetTimesetWidget'
                            }]
                        }
                    ]
                }]
            }]
        }, {
            userCls: 'big-70 small-100',
            xtype: 'core-container',
            items: [{
                padding: '0 0 20 0',
                html: Ext.String.format('<div class="fa fa-mail-forward cf-subtitle"> {0}</div>', Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')])
            }, {
                xtype: 'callforwardmainform'
            }]
        }];
        this.callParent();
    }

});
