Ext.define('NgcpCsc.view.pages.conversations.ConversationsController', {
    extend: 'NgcpCsc.view.pages.account.AccountController',

    alias: 'controller.conversations',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
    },

    onIconHovered: function(event, el) {
        // Register the new tip with an element's ID
         Ext.tip.QuickTipManager.register({
             target: el.id, // Target button's ID
             text  : el.dataset.tooltip // Tip content
         });
    },

    renderPhoneIcon: function(value, meta, record) {
        var icon;
        switch (record.get('call_type')) {
            case 'call':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.call_types.call[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-phone-square green-icon fa-2x pointer';
                break;
            case 'voicemail':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.call_types.voicemail[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-envelope green-icon fa-2x pointer';
                break;
            case 'sms':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.call_types.sms[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-comment green-icon fa-2x pointer';
                break;
            case 'chat':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.call_types.chat[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-wechat green-icon fa-2x pointer';
                break;
            case 'fax':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.call_types.fax[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-file-text green-icon fa-2x pointer';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderCallTypeIcons: function(value, meta, record) {
        var icon,
            color = record.get('status') + '-call-color';
        switch (record.get('direction')) {
            case 'incoming':
                icon = color + ' fa fa-chevron-left fa-2x';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.call_type.incoming[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'outgoing':
                icon = color + ' fa fa-chevron-right fa-2x';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.call_type.outgoing[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'forwarded':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.call_type.forwarded[localStorage.getItem('languageSelected')] + '"';
                return '<div><span class="' + color + ' fa fa-chevron-right fa-2x"></span><span class="' + color + ' fa fa-chevron-right fa-2x"></span></div>';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderCaller: function(val) {
        return '<div class="caller">' + val + '</div>';
    },

    removeCard: function(el) {
        var store = Ext.getStore('Conversations');
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
        sample.addEventListener("ended", function() {
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

    startCall: function(el) {
        var record = Ext.getStore('Conversations').findRecord('id', el.id.split('-')[1]);
        this.fireEvent('initwebrtc', record, true);
    },

    sendSms: function(el) {
        this.startCall(el);
    },

    startChat: function(el) {
        this.startCall(el);
    },

    sendFax: function(el) {
        this.startCall(el);
    },

    downloadFax: function(el) {
        // TODO 
    },

    openCallPanel: function(cmp) {
        this.fireEvent('initwebrtc', null, false, true);
    },

    expandConversation: function(view, td, cellindex, record, tr) {
        if (cellindex == 4) {
            // TODO different actions for different call_type
            switch (record.get('call_type')) {
                case 'call':
                    this.openCallPanel();
                    break;
                case 'fax':
                    this.openCallPanel();
                    break;
                case 'sms':
                    this.openCallPanel();
                    break;
                case 'chat':
                    this.openCallPanel();
                    break;
            };
        } else {
            var row = document.getElementById(record.get('id'));
            var footer = document.getElementById('card-footer-' + record.get('id'));
            var msgPreview = document.getElementById('msg-preview-' + record.get('id'));
            if (row.classList.contains('hidden')) {
                record.set('expanded', true);
                row.classList.remove('hidden');
                footer.classList.add('hidden');
                if (msgPreview) {
                    msgPreview.classList.add('hidden');
                }
            } else {
                record.set('expanded', false);
                row.classList.add('hidden');
                footer.classList.remove('hidden');
                if (msgPreview) {
                    msgPreview.classList.remove('hidden');
                }
            };
        }
        view.grid.updateLayout();

    },
    renderShortCut: function(value, meta, record) {
        var retVal;
        if (record.get('expanded') == true) { // hide shortcut icons when card is collapsed
            return '';
        }
        switch (record.get('call_type')) {
            case 'call':
                icon = 'fa fa-phone green-icon fa-2x pointer';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'voicemail':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.listen[localStorage.getItem('languageSelected')] + '"';
                return '<div id="voicemail-' + record.get('id') + '" class="card-icon" data-callback="reproduceVoicemail"><i class="fa fa-play green-icon fa-2x pointer" aria-hidden="true"></i></div>'
                break;
            case 'fax':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.send_fax[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-fax green-icon fa-2x pointer';
                break;
            case 'sms':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.send_sms[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-comment green-icon fa-2x pointer';
                break;
            case 'chat':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.chat[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-wechat green-icon fa-2x pointer';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    // libphonenumber returns country codes; i did not find yet
    // a free library which returns city name from areaCode like
    // +43-1-23456 => {country:'AT', city:'Vienna'}
    // https://github.com/halt-hammerzeit/libphonenumber-js
    renderCity: function(value, meta, record) {
        var lookupData = new libphonenumber.parse(record.get('source_cli'));
        return lookupData.country;
    },

    saveSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }
});
