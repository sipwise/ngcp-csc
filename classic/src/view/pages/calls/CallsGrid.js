Ext.define('NgcpCsc.view.pages.calls.CallsGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'calls-grid',
    
    store: 'Calls',

    _groupCallsByMonth: false,

    listeners: {
        cellclick: 'onCellClicked'
    },

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                dataIndex: 'call_type',
                renderer: 'renderCallTypeIcons',
                width: 30
            }, {
                text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')] : '',
                flex: 1,
                dataIndex: 'source_cli'
            }, {
                renderer: 'renderPhoneIcon',
                width: 40

            }, {
                text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] : '',
                flex: 1,
                dataIndex: 'duration'
            }, {
                text: (this._groupCallsByMonth) ? Ngcp.csc.locales.calls.charges[localStorage.getItem('languageSelected')] : '',
                flex: 1,
                dataIndex: 'charges'
            }, {
                xtype: 'datecolumn',
                text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] : '',
                flex: 1,
                dataIndex: 'start_time',
                align: 'right',
                format: 'd.m.Y h:i:s'
            }]
        };

        if(this._groupCallsByMonth){
            this.features = [{
                ftype: 'grouping',
                groupHeaderTpl: [
                    '<div><b>{name:this.formatName}</b></div>', {
                        formatName: function(name) {
                            return name.split('.')[1];
                        }
                    }
                ]
            }];
        }
        this.callParent();
    }
})
