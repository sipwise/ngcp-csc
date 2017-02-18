Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'callblocking-grid',

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

    userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'block_list',
            renderer: 'renderBarrNumber'
        }]
    },

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record, orig) {
                var enabledState = data.enabled ? 'on' : 'off';
                var enabledIcon = '<div id="enableNumberBlocking-' + record.get('id') + '" class="card-icon" data-callback="enableNumberBlocking" data-tooltip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"><i id="enableNumberBlocking" class="fa fa-toggle-' + enabledState + ' fa-2x" aria-hidden="true"></i>';
                var deleteIcon = '<div id="deleteRecord-' + record.get('id') + '" class="card-icon" data-callback="deleteRecord" data-tooltip="' + Ngcp.csc.locales.callblocking.delete_number[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></div>';
                return {
                    rowBody: Ext.String.format('<div class="card-wrapper pointer" id=' + record.get('id') + '><div class="card-icon-row callblocking-footer">{0}{1}</div></div>', enabledIcon, deleteIcon)
                };
            }
        }];

        this.callParent();
    }

})
