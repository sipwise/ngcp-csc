Ext.define('NgcpCsc.view.pages.calls.CallsController', {
    extend: 'NgcpCsc.view.pages.summary.SummaryController',

    alias: 'controller.calls',

    renderPhoneIcon: function(value, metaData) {
        return '<div class="fa fa-phone-square pointer"></div>';
    },

    renderCallTypeIcons: function(value) {
        var icon;
        switch (value) {
            case 'call':
                icon = 'fa fa-arrow-circle-down';
                break;
            case 'cfu':
                icon = 'fa fa-arrow-circle-up';
                break;
            case 'cfb':
                icon = 'fa fa-arrow-circle-left';
                break;
            case 'cft':
                icon = 'fa fa-arrow-circle-right';
                break;
            case 'cfna':
                icon = 'fa fa-arrow-circle-down';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    onCellClicked: function(view, td, cellindex, record) {
        if (cellindex == 3) {
            this.fireEvent('initwebrtc', record);
        }
    }
});
