Ext.define('NgcpCsc.view.pages.callforward.companyhours.Companyhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'companyhours',

    ui: 'cf-mainform',

    initComponent: function () {
        var callForwardCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardCompany.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
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
                        userCls: 'big-33 small-100 cf-calls-curing-section',
                        items: [{
                            layout: 'hbox',
                            items: [{
                                xtype: 'container',
                                userCls: 'cf-calls-during',
                                html: Ngcp.csc.locales.callforward.for_calls_during_company_hours[localStorage.getItem('languageSelected')],
                                margin: '10 0 0 0'
                            }, {
                                xtype: 'button',
                                userCls: 'cf-calendar-button',
                                iconCls: Ngcp.csc.icons.calendar2x,
                                handler: 'toggleCompanyTimesetGrid'
                            }]
                        }]
                    }, {
                        xtype: 'panel',
                        userCls: 'big-66 small-100',
                        bind: {
                            hidden: '{company_hours}'
                        },
                        items: [
                            callForwardCompanyGrid
                        ]
                    }]
                },
                {
                    xtype: 'container',
                    userCls: 'cf-text',
                    html: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
                    margin: '10 0 10 0'
                }, {
                    xtype: 'statusbar',
                    reference: 'loadingBar'
                }, {
                xtype: 'companyhourstabs'
            }]
        }];
        this.callParent();
    }

});
