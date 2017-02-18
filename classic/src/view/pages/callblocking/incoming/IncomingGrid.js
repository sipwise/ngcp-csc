Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'incoming-grid',

    cls: 'card-grid',

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
        }
    },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false,
        enableTextSelection: true
    },

    store: 'CallBlockingIncoming',

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'block_in_list',
            renderer: 'renderBarrNumber'
        }]
    },

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record, orig) {
                var enabledState = data.enabled ? 'on' : 'off';
                var enabledIcon = '<div id="enableNumberBlocking-' + record.get('id') + '" class="card-icon" data-callback="enableNumberBlocking" data-tooltip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '" style="float: left;color: #919191;"><i id="enableNumberBlocking" class="fa fa-toggle-' + enabledState + ' fa-2x" aria-hidden="true"></i>';
                var deleteIcon = '<div id="deleteRecord-' + record.get('id') + '" class="card-icon" data-callback="deleteRecord" data-tooltip="' + Ngcp.csc.locales.callblocking.delete_number[localStorage.getItem('languageSelected')] + '" style="float: right;color: #919191;"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></div>';
                return {
                    rowBody: Ext.String.format('<div style="padding: 10px 20px;background: #EFEFEF;clear: both;">{0}{1}</div>', enabledIcon, deleteIcon)
                };
            }
        }];

        this.callParent();
    }

})
