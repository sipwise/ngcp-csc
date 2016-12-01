Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.voicemails',

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

    clickSmCard: function(view, record, item, rowIndex, e, eOpts) {
        var store = view.getStore();
        var rec = view.getStore().getAt(rowIndex);
        var target = e.getTarget();
        for (var item in target.classList) {
            if (target.classList[item] === 'fa-file-audio-o') {
                // TODO
            } else if (target.classList[item] === 'fa-phone-square') {
                // TODO
            } else if (target.classList[item] === 'fa-remove') {
                store.remove(rec);
                this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
            };
        };
    }

});
