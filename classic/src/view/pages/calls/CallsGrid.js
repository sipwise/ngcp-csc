Ext.define('NgcpCsc.view.pages.calls.CallsGrid', {

    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'calls-grid',

    store: 'Calls',

    cls: 'card-grid',

    header: false,

    _groupCallsByMonth: false,

    listeners: {
        click: 'onIconClicked',
        element: 'el',
        delegate: 'div.card-icon'
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
            text: (this._groupCallsByMonth) ? Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')] : '',
            flex: 1,
            dataIndex: 'source_cli',
            renderer: 'renderCaller'
        }, {
            dataIndex: 'call_type',
            renderer: 'renderCallTypeIcons',
            width: 30
        }]
    },

    initComponent: function() {
        this.plugins = [{
            ptype: 'rowexpander',
            id: 'rowexpander',
            selectRowOnExpand: false,
            expandOnDblClick: false,
            rowBodyTpl: new Ext.XTemplate(
                '<tpl switch="values.call_type">',
                '<tpl case="call">', // call tpl
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: {duration}</div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.calls.charges[localStorage.getItem('languageSelected')] + '</b>: {charges} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon" data-callback="startChat"><i class="fa fa-wechat green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="startCall"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="removeCard"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '</div></div>',
                '<tpl case="voicemail">', // voicemail tpl
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.caller[localStorage.getItem('languageSelected')] + '</b>: {number}</div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: {duration} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.calls.folder[localStorage.getItem('languageSelected')] + '</b>: {folder} </div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon" data-callback="reproduceVoicemail"><i class="fa fa-play green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="startCall"><i class="fa fa-phone green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<div id="{id}" class="card-icon" data-callback="removeCard"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '<audio id="sample" src="resources/audio/voicemail.mp3" preload="auto"></audio>',
                '</div></div>',
                '<tpl case="fax">', // fax tpl
                '<div class="card-wrapper">',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')] + '</b>: {duration}</div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.calls.pages[localStorage.getItem('languageSelected')] + '</b>: {pages}</div>',
                '<div class="card-data-row"><span class="fa fa-file-text-o"></span><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')] + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div>',
                '<div class="card-icon-row">',
                '<div id="{id}" class="card-icon"><a href="resources/docs/fax.pdf" target="_blank"><i class="fa fa-file-pdf-o green-icon fa-2x pointer" aria-hidden="true"></i></a></div>',
                '<div id="{id}" class="card-icon" data-callback="removeCard"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>',
                '</div></div>',
                '</tpl>'
            )
        }];
        this.callParent();
    }
})
