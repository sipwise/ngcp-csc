Ext.define('NgcpCsc.view.pages.calls.CallsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'calls-grid',

    store: 'Calls',

    _groupCallsByMonth: false,

    listeners: {
        cellclick: 'onCellClicked'
    },

    rowLines : false,

    viewConfig : {
        stripeRows:false,
        columnLines:false
    },

    columns : {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [ {
            renderer: 'renderPhoneIcon',
            width: 40
        }, {
            text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')] : '',
            flex: 1,
            dataIndex: 'source_cli',
            renderer: 'renderCaller'
        },{
            dataIndex: 'call_type',
            renderer: 'renderCallTypeIcons',
            width: 30
        }
    ]
    },

    initComponent: function() {
        var voiceBoxGrid = Ext.create('NgcpCsc.view.pages.calls.VoiceMailsGrid', {
            bind: {
                title: '{month_summary}'
            }
        });
        this.plugins = [{
            ptype: 'rowexpander',
            id: 'rowexpander',
            selectRowOnExpand: true,
            expandOnDblClick: false,
            rowBodyTpl: new Ext.XTemplate(
                        '<tpl switch="values.call_type">',
                            '<tpl case="call">',
                                '<div class="content">',
                                '<div class="contact-wrapper">',
                                '<p><div class="short-label">' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')]+ '</b>: {duration}</div>',
                                '<div class="short-label"><b>' + Ngcp.csc.locales.calls.charges[localStorage.getItem('languageSelected')] + '</b>: {charges} </div>',
                                '<div class="short-label"><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')]  + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div></p>',
                                '<p><div class="icons-container"></div></p>',
                                '</div></div>',
                            '<tpl case="cft">',
                                '<div class="voicemails-outer">',
                                    '<div class="voicemails-inner ngcp-sm-card">',
                                        // '<div class="voicemails-datarow"><i class="fa fa-envelope" aria-hidden="true"></i><h2 class="voicemails-h2">Voicemail</h2></div>',
                                        // '<div class="ngcp-card-hr"></div>',
                                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Caller: {caller}</p></div>',
                                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Duration: {duration}</p></div>',
                                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Time: {time}</p></div>',
                                        '<div class="ngcp-card-hr"></div>',
                                        '<div class="ngcp-card-icon-row">',
                                            '<div class="ngcp-card-icon"><i class="fa fa-file-audio-o fa-2x" aria-hidden="true"></i></div>',
                                            '<div class="ngcp-card-icon"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i></div>',
                                            '<div class="ngcp-card-icon"><i class="fa fa-remove fa-2x" aria-hidden="true"></i></div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '<tpl default>',
                                '<p>TODO</p>',
                        '</tpl>'
                )
        }];
        this.callParent();
    }
})
