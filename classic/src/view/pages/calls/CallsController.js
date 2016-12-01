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

    /* voicemails */
    renderCaller: function(val) {
        return val;
    },

    renderCall: function(val) {
        return '<div class="fa fa-phone-square pointer"></div>';
    },

    removeVoicemail: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    reproduceVoicemail: function(val, rec) {
        this.fireEvent('showmessage', false, 'Todo');
    },

    saveSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },

    onCellClicked: function(view, td, cellindex, record) {
        if (cellindex == 3) {
            this.fireEvent('initwebrtc', record);
        }
    }
});
