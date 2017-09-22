Ext.define('NgcpCsc.view.pages.callforward.afterhours.Afterhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'afterhours',

    ui: 'cf-mainform',

    initComponent: function() {
        var cfInitialStore = Ext.create('NgcpCsc.store.CallForwardDestinations', {
            storeId: 'CallForwardAfterHours',
            _type: 'afterHours',
            autoLoad: true,
            listeners: {
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        var callForwardAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-after-grid',
            bind: {
                hidden: '{!after_hours_exists_in_api}'
            },
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                storeId: 'afterhours-Timeset'
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
                    name: 'timesetCont',
                    id: 'collapsePanel-afterhours',
                    title: Ngcp.csc.locales.callforward.for_calls_during_after_hours[localStorage.getItem('languageSelected')],
                    width: '100%',
                    collapsible: true,
                    bind: {
                        collapsed: '{afterPanelIsCollapsed}'
                    },
                    listeners: {
                        collapse: 'collapsePanel',
                        expand: 'collapsePanel'
                    },
                    userCls: 'big-33 small-100 cf-calls-during-section',
                    items: [{
                            xtype: 'panel',
                            margin: '10 0 10 0',
                            html: Ngcp.csc.locales.callforward.no_after_hours_set[localStorage.getItem('languageSelected')],
                            bind: {
                                hidden: '{after_hours_exists_in_api}'
                            }
                        },
                        callForwardAfterGrid, {
                            margin: '10 0 10 0',
                            layout: 'hbox',
                            width: '100%',
                            bind: {
                                hidden: '{!after_hours_exists_in_api}'
                            },
                            items: [{
                                flex: 6
                            },{
                                flex: 2,
                                margin: '0 5 0 0',
                                text: Ngcp.csc.locales.callforward.add_new_period[localStorage.getItem('languageSelected')],
                                xtype: 'button',
                                id: 'afterhours-addNewPeriodButton',
                                listeners: {
                                    click: 'addNewPeriod'
                                },
                            }, {
                                text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                                xtype: 'button',
                                cls: 'x-btn-left',
                                id: 'afterhours-saveButton',
                                listeners: {
                                    click: 'saveTimesetGrid'
                                }
                            }]
                        }
                    ]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                title: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
                bind: {
                    hidden: '{!after_hours_exists_in_api}'
                }
            }, {
                xtype: 'cftab',
                _tabId: 'afterhours',
                _firstPrefixes: ['everybody-'],
                _secondprefix: 'afterhours-',
                bind: {
                    hidden: '{!after_hours_exists_in_api}'
                }
            }]
        }];
        this.callParent();
    }

});
