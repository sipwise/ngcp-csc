Ext.define('NgcpCsc.view.pages.conversations.CallsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'conversations-grid',

    store: 'Conversations',

    cls: 'card-grid',

    header: false,

    _groupCallsByMonth: false,

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
        },
        cellclick: 'expandConversation'
    },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false
    },

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            renderer: 'renderPhoneIcon',
            width: 40
        }, {
            dataIndex: 'call_type',
            renderer: 'renderCallTypeIcons',
            width: 30
        }, {
            text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')] : '',
            width: 60,
            dataIndex: 'source_cli',
            renderer: 'renderCaller'
        },{
            renderer: 'renderCity',
            dataIndex: 'city',
            flex: 1
        },{
            renderer: 'renderShortCut',
            width: 40
        }]
    },
    initComponent: function() {

        this.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record, orig) {
                var content;
                var footer = "<div id='card-footer-" + record.get('id') + "'><div><hr class='fade'></div><div>3 minutes ago</div></div>" // TODO real data
                switch (record.get('call_type')) {
                    case 'call':
                        content = '<div class="card-wrapper hidden" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.charges[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('charges') + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="startChat"><i class="fa fa-wechat green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="startCall"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="removeCard"></div>' +
                            '</div></div>';
                        break;
                    case 'voicemail':
                        content = '<div class="card-wrapper hidden" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.caller[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('number') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.folder[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('folder') + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="reproduceVoicemail"><i class="fa fa-play green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="startCall"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="removeCard"></div>' +
                            '<audio id="sample" src="resources/audio/voicemail.mp3" preload="auto"></audio>' +
                            '</div></div>';
                        break;
                    case 'fax':
                        content = '<div class="card-wrapper hidden" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.pages[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('pages') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="'+record.get('id')+'" class="card-icon"><a href="resources/docs/fax.pdf" target="_blank"><i class="fa fa-file-pdf-o green-icon fa-2x pointer" aria-hidden="true"></i></a></div>' +
                            '<div id="'+record.get('id')+'" class="card-icon" data-callback="removeCard"></div>' +
                            '</div></div>';
                        break;
                }
                return {
                    rowBody: content + footer
                };
            }
        }];
        this.callParent();
    }
})
