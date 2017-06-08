Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'callblocking-grid',

    cls: 'card-grid',

    listeners: {
        click: {
            fn: 'onIconClicked',
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

    columns: [{
        flex: 1,
        dataIndex: 'block_list',
        renderer: 'renderBarrNumber',
        menuDisabled: true,
        resizable: false
    }],

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var enabledState = data.enabled ? 'on' : 'off';
                var deleteIcon = '<div id="deleteRecord-' +
                record.get('id') + '" class="card-icon" data-callback="deleteRecord"><i class="' +
                Ngcp.csc.icons.trash2x + '" aria-hidden="true" data-qtip="' +
                Ngcp.csc.locales.callblocking.delete_number[localStorage.getItem('languageSelected')] +
                '"></i></div>';
                var enabledIcon = '<div id="enableNumberBlocking-' + record.get('id') +
                '" class="card-icon" data-callback="enableNumberBlocking"><i id="enableNumberBlocking" class="'+
                Ngcp.csc.icons.toggle[enabledState + '2x'] + '" aria-hidden="true" data-qtip="' +
                Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] +
                '"></i>';
                return {
                    rowBody: Ext.String.format('<div class="card-wrapper pointer" id=' + record.get('id') +
                    '><div class="card-icon-row callblocking-footer">{0}{1}</div></div>', deleteIcon, enabledIcon)
                };
            }
        }];

        this.callParent();
    }

})
