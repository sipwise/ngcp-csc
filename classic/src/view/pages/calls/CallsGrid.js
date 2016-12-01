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
    },

    initComponent: function() {
        this.plugins = [{
            ptype: 'rowexpander',
            id: 'rowexpander',
            selectRowOnExpand: true,
            expandOnDblClick: false,
            rowBodyTpl: new Ext.XTemplate(
                '<div class="content">',
                '<div class="contact-wrapper">',
                '<p><div class="short-label"><b>' + Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')]+ '</b>: {duration}</div></p>',
                '<p><div class="short-label"><b>' + Ngcp.csc.locales.calls.charges[localStorage.getItem('languageSelected')] + '</b>: {charges} </div></p>',
                '<p><div class="short-label"><b>' + Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')]  + '</b>: {[ Ext.util.Format.date(values.start_time, "d.m.Y h:i:s")]} </div></p>',
                '<p><div class="icons-container"></div></p>',
                '</div></div>')
        }];
        this.callParent();
    }
})
