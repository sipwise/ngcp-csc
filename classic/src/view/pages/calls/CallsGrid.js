Ext.define('NgcpCsc.view.pages.calls.CallsGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'calls-grid',

    layout: 'fit',

    store: 'Calls',

    _groupCallsByMonth: false,

    listeners: {
        cellclick:'onCellClicked'
    },

    initComponent: function() {

        if(this._groupCallsByMonth){
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
        }else{
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

                }]
            };
            this.rowLines = false;
            this.viewConfig = {
                stripeRows:false,
                columnLines:false
            };
            this.plugins = [{
                ptype: 'rowexpander',
                id: 'rowexpander',
                selectRowOnExpand: true,
                rowBodyTpl: new Ext.XTemplate(
                    '<div class="content">',
                    '<div class="contact-wrapper">',
                    '<p><div class="short-label"><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')]+ '</b>: {duration}</div></p>',
                    '<p><div class="short-label"><b>' + Ngcp.csc.locales.calls.charges[localStorage.getItem('languageSelected')] + '</b>: {charges} </div></p>',
                    '<p><div class="short-label"><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')]  + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div></p>',
                    '</div></div>')
            }];
        }
        this.callParent();
    }
})
