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

    onCellClicked: function(view, td, cellindex, record){
        this.fireEvent('initwebrtc', record);
    }
});
