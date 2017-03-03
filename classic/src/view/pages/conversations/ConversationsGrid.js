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
        mouseover: {
            fn: 'onIconHovered',
            element: 'el',
            delegate: 'div.card-icon'
        },
        cellclick: 'expandConversation',
        rowbodyclick: 'expandConversation'
    },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false,
        // TODO: Added, but does not enable selection inside rowbody
        enableTextSelection: true
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
            dataIndex: 'conversation_type',
            renderer: 'renderCallTypeIcons',
            width: 40
        }, {
            renderer: 'renderDescription',
            flex: 2
        }, {
            text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')] : '',
            dataIndex: 'source_cli',
            renderer: 'renderCallee',
            flex: 3
        }]
    },
    initComponent: function() {
        var me = this;
        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content;
                var footer = "<div class='pointer card-footer' id='card-footer-" + record.get('id') + "'><div></div><div>" + Ngcp.csc.formatter.timeSince(record.get('start_time')) + " " + Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')] + "</div></div>"
                var previewCharNum = Ext.os.is.Desktop ? 110 : me.getWidth() / 7.5;
                switch (record.get('conversation_type')) {
                    case 'call':
                        content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.cost[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('charges') + record.get('currency') + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="sendSms-' + record.get('id') + '" class="card-icon" data-callback="sendSms" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.new_sms[localStorage.getItem('languageSelected')] + '"><i class="fa fa-envelope green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="startChat-' + record.get('id') + '" class="card-icon" data-callback="startChat" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.chat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-comment green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="startCall-' + record.get('id') + '" class="card-icon" data-callback="startCall" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '</div></div>';
                        break;
                    case 'voicemail':
                        content = '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.folder[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('folder') + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="startCall-' + record.get('id') + '" class="card-icon" data-callback="startCall" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="reproduceVoicemail-' + record.get('id') + '" class="card-icon" data-callback="reproduceVoicemail" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.listen[localStorage.getItem('languageSelected')] + '"><i class="fa fa-play green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<audio id="sample" src="resources/audio/voicemail.mp3" preload="auto"></audio>' +
                            '</div></div>';
                        break;
                    case 'sms':
                        content =
                            '<div class="card-data-row sms-preview" id=msg-preview-' + record.get('id') + '>' + Ext.String.ellipsis(record.get('text'), previewCharNum) + '</div>' +
                            '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                            '<div class="card-data-row ">' + record.get('text') + '</div>' +
                            '<div class="card-data-row "><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.cost[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('charges') + record.get('currency') + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="sendSms-' + record.get('id') + '" class="card-icon" data-callback="sendSms" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.send_sms[localStorage.getItem('languageSelected')] + '"><i class="fa fa-envelope green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="startChat-' + record.get('id') + '" class="card-icon" data-callback="startChat" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.chat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-comment green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="startCall-' + record.get('id') + '" class="card-icon" data-callback="startCall" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '</div></div>';
                        break;
                    case 'chat':
                        content =
                            '<div class="card-data-row  chat-preview" id=msg-preview-' + record.get('id') + '>' + Ext.String.ellipsis(record.get('text'), previewCharNum) + '</div>' +
                            '<div class="card-wrapper hidden pointer" id=' + record.get('id') + '>' +
                            '<div class="card-data-row  ">' + record.get('text') + '</div>' +
                            '<div class="card-data-row "><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-icon-row">' +
                            '<div id="startChat-' + record.get('id') + '" class="card-icon" data-callback="startChat" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.chat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-comment green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '</div></div>';
                        break;
                    case 'fax':
                        content = '<div class="card-wrapper hidden" id=' + record.get('id') + '>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: ' + Ext.util.Format.date(record.get('start_time'), "d.m.Y h:i:s") + ' </div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('duration') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.conversations.pages[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('pages') + '</div>' +
                            '<div class="card-icon-row">' +
                            '<div id="downloadFax-' + record.get('id') + '" class="card-icon" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.download_fax[localStorage.getItem('languageSelected')] + '"><a href="resources/docs/fax.pdf" target="_blank"><i class="fa fa-download green-icon fa-2x pointer" aria-hidden="true"></i></a></div>' +
                            '<div id="sendFax-' + record.get('id') + '" class="card-icon" data-callback="sendFax" data-tooltip="' + Ngcp.csc.locales.conversations.tooltips.send_fax[localStorage.getItem('languageSelected')] + '"><i class="fa fa-file-text green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
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
