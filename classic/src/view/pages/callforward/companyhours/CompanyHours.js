Ext.define('NgcpCsc.view.pages.callforward.companyhours.Companyhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'companyhours',

    ui: 'cf-mainform',

    initComponent: function() {
        var cfInitialStore = Ext.create('NgcpCsc.store.CallForwardDestinations', {
            storeId: 'CallForwardCompanyHours',
            _type: 'companyHours',
            autoLoad: true,
            listeners: {
                beforeload: function(store) {
                    store._preventReLoad = false;
                },
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        var callForwardCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            bind: {
                hidden: '{!company_hours_exists_in_api}'
            },
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                storeId: 'companyHours-Timeset'
            })
        });

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                layout: 'responsivecolumn',
                xtype: 'container',
                items: [{
                    xtype: 'panel',
                    id: 'collapsePanel-companyHours',
                    title: Ngcp.csc.locales.callforward.for_calls_during_company_hours[localStorage.getItem('languageSelected')],
                    width: '100%',
                    collapsible: true,
                    bind: {
                        collapsed: '{companyPanelIsCollapsed}'
                    },
                    listeners: {
                        collapse: 'collapsePanel',
                        expand: 'collapsePanel'
                    },
                    userCls: 'big-33 small-100 cf-calls-during-section',
                    items: [{
                            xtype: 'panel',
                            margin: '10 0 10 0',
                            html: Ngcp.csc.locales.callforward.no_company_hours_set[localStorage.getItem('languageSelected')],
                            bind: {
                                hidden: '{company_hours_exists_in_api}'
                            }
                        },
                        callForwardCompanyGrid,
                        {
                            text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                            xtype: 'button',
                            cls: 'x-btn-left',
                            id: 'companyHours-saveButton',
                            width: 135,
                            margin: '10 0 10 585',
                            listeners: {
                                click: 'saveTimesetGrid'
                            },
                            bind: {
                                hidden: '{!company_hours_exists_in_api}'
                            }
                        }
                    ]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                title: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
                bind: {
                    hidden: '{!company_hours_exists_in_api}'
                }
            }, {
                xtype: 'cftab',
                _tabId: 'companyhours',
                _firstPrefixes: ['everybody-'],
                _secondprefix: 'companyhours-',
                bind: {
                    hidden: '{!company_hours_exists_in_api}'
                }
            }]
        }];
        this.callParent();
    }

});
