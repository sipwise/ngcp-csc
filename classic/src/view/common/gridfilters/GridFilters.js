Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    initComponent:function(){

        this.items = [{
            xtype:'form',
            items: [{
                html: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'datefield',
                format: 'd.m.Y',
                labelAlign: 'top',
                width: this._isNested ? '100%' : '98%',
                fieldLabel: Ngcp.csc.locales.filters.from[localStorage.getItem('languageSelected')],
                name: 'from_date',
                bind:{
                    value:'{filtergrid.from_date}',
                    maxValue: '{filtergrid.to_date}'
                }
            }, {
                xtype: 'datefield',
                format: 'd.m.Y',
                width: this._isNested ? '100%' : '98%' ,
                name: 'to_date',
                bind: '{filtergrid.to_date}',
                maxValue: new Date() // limited to the current date or prior
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                width: this._isNested ? '100%' : '98%',
                fieldLabel: Ngcp.csc.locales.filters.search_term[localStorage.getItem('languageSelected')]
            }, {
                layout: 'hbox',
                margin: '10 0 0 0',
                defaults: {
                    xtype: 'button',
                    flex: 1
                },
                items: [{
                    text: Ngcp.csc.locales.filters.apply[localStorage.getItem('languageSelected')],
                    margin: '0 5 0 0',
                    handler: 'submitFilters'
                }, {
                    text: Ngcp.csc.locales.filters.reset[localStorage.getItem('languageSelected')],
                    handler: 'resetFilters'
                }]
            }]
        }];
        this.callParent();
    }

})
