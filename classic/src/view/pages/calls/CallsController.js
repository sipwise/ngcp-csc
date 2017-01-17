Ext.define('NgcpCsc.view.pages.calls.CallsController', {
    extend: 'NgcpCsc.view.pages.summary.SummaryController',

    alias: 'controller.calls',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
    },

    renderPhoneIcon: function(value, metaData, record) {
        var icon;
        switch (record.get('call_type')) {
            case 'call':
                icon = 'fa fa-phone-square green-icon fa-2x pointer';
                break;
            case 'cft':
                icon = 'fa fa-envelope green-icon fa-2x pointer';
                break;
            case 'cfna':
                icon = 'fa fa-file green-icon fa-2x pointer';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderCallTypeIcons: function(value, meta, record) {
        var icon,
            color = record.get('status') + '-call-color';
        switch (record.get('direction')) {
            case 'incoming':
                icon = color + ' fa fa-arrow-down fa-2x fa-rotate-45';
                break;
            case 'outgoing':
                icon = color + ' fa fa-arrow-up fa-2x fa-rotate-45';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderCaller: function(val) {
        return '<div class="voicemails-h2">' + val + '</div>';
    },


    removeCard: function(el) {
        var store = Ext.getStore('Calls');
        var rec = store.findRecord('id', el.id);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    reproduceVoicemail: function(el) {
        var elClassList = el.firstChild.classList;
        var sample = document.getElementById("sample");
        elClassList.remove('fa-play')
        elClassList.add('fa-pause');
        el.dataset.callback = 'stopVoicemail';
        sample.play();
        sample.addEventListener("ended", function(){
             sample.currentTime = 0;
             elClassList.add('fa-play')
             elClassList.remove('fa-pause');
        });
    },

    stopVoicemail: function(el) {
        var elClassList = el.firstChild.classList;
        var sample = document.getElementById("sample");
        elClassList.remove('fa-pause')
        elClassList.add('fa-play');
        el.dataset.callback = 'reproduceVoicemail';
        sample.pause();
    },
    /*****/

    startCall:function(el){
        var record = Ext.getStore('Calls').findRecord('id', el.id);
        this.fireEvent('initwebrtc', record, true);
    },

    startChat:function(el){
        // TODO
        this.startCall(el);
    },

    saveSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }
});
