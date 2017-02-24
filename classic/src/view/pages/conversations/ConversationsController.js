Ext.define('NgcpCsc.view.pages.conversations.ConversationsController', {
    extend: 'NgcpCsc.view.pages.account.AccountController',

    alias: 'controller.conversations',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
        }
    },

    onIconHovered: function(event, el) {
        if( !event.target.classList.contains('play') &&
            !event.target.classList.contains('fa-play') &&
            !event.target.classList.contains('fa-pause')){
            // Register the new tip with an element's ID
            Ext.tip.QuickTipManager.register({
                target: el.id, // Target button's ID
                text: el.dataset.tooltip // Tip content
            });
        }
    },

    renderPhoneIcon: function(value, meta, record) {
        var icon;
        switch (record.get('conversation_type')) {
            case 'call':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.conversation_types.call[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-phone green-icon pointer';
                break;
            case 'voicemail':
                icon = 'fa fa-folder-open-o green-icon pointer';
                break;
            case 'sms':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.conversation_types.sms[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-envelope-o green-icon pointer';
                break;
            case 'chat':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.conversation_types.chat[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-comment-o green-icon pointer';
                break;
            case 'fax':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.conversation_types.fax[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-file-text-o green-icon pointer';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderCallTypeIcons: function(value, meta, record) {
        var icon,
            color = record.get('status') + '-call-color',
            direction = record.get('direction');
        switch (record.get('direction')) {
            case 'incoming':
                icon = color + ' fa fa-chevron-left';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.incoming[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'outgoing':
                icon = color + ' fa fa-chevron-right';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.outgoing[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'forwarded':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.forwarded[localStorage.getItem('languageSelected')] + '"';
                return '<div><span class="' + color + ' fa fa-chevron-right"></span><span class="' + color + ' fa fa-chevron-right"></span></div>';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    renderDescription: function(value, meta, record) {
        var desc;
        switch (record.get('direction')) {
            case 'incoming':
                switch(record.get('status')) {
                    case 'answered':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.received_call_from[localStorage.getItem('languageSelected')];
                                break;
                            case 'fax':
                                desc = Ngcp.csc.locales.conversations.received_fax_from[localStorage.getItem('languageSelected')];
                                break;
                            case 'sms':
                                desc = Ngcp.csc.locales.conversations.received_sms_from[localStorage.getItem('languageSelected')];
                                break;
                            case 'chat':
                                desc = Ngcp.csc.locales.conversations.received_chat_message_from[localStorage.getItem('languageSelected')];
                                break;
                            case 'voicemail':
                                desc = Ngcp.csc.locales.conversations.received_voice_mail_from[localStorage.getItem('languageSelected')];
                                break;
                        }
                        break;
                    case 'missed':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.missed_call_from[localStorage.getItem('languageSelected')];
                                break;
                            // there shouldn't be other missed types
                        }
                        break;
                }
                break;
            case 'outgoing':
                switch(record.get('status')) {
                    case 'answered':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.successful_call_to[localStorage.getItem('languageSelected')];
                                break;
                            case 'fax':
                                desc = Ngcp.csc.locales.conversations.successful_fax_to[localStorage.getItem('languageSelected')];
                                break;
                            case 'sms':
                                desc = Ngcp.csc.locales.conversations.successful_sms_to[localStorage.getItem('languageSelected')];
                                break;
                            case 'chat':
                                desc = Ngcp.csc.locales.conversations.sent_chat_message_to[localStorage.getItem('languageSelected')];
                                break;
                        }
                        break;
                    case 'missed':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.unsuccessful_call_to[localStorage.getItem('languageSelected')];
                                break;
                            case 'fax':
                                desc = Ngcp.csc.locales.conversations.unsuccessful_fax_to[localStorage.getItem('languageSelected')];
                                break;
                            // there shouldn't be other missed types
                        }
                        break;
                }
                break;
            case 'forwarded':
                switch(record.get('status')) {
                    case 'answered':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.successful_call_forward_to[localStorage.getItem('languageSelected')];
                                break;
                            case 'sms':
                                desc = Ngcp.csc.locales.conversations.successful_sms_forward_to[localStorage.getItem('languageSelected')];
                                break;
                            // there shouldn't be other forwarded types
                        }
                        break;
                    case 'missed':
                        switch(record.get('conversation_type')) {
                            case 'call':
                                desc = Ngcp.csc.locales.conversations.unsuccessful_call_forward_to[localStorage.getItem('languageSelected')];
                                break;
                            // there shouldn't be other missed types
                        }
                        break;
                }
                break;
        };
        return '<div class="conv-description">' + desc + '</div>';
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

    openCallPanel: function(cmp) {
        this.fireEvent('initwebrtc', null, false, true);
    },

    expandConversation: function(view, td, cellindex, record, tr) {
        if(cellindex.target && cellindex.target.classList.contains('green-icon')){
            return;
        }
        if (cellindex == 4) {
            // TODO different actions for different conversation_type
            switch (record.get('conversation_type')) {
                case 'call':
                case 'fax':
                case 'sms':
                case 'chat':
                    this.openCallPanel();
                break;
            };
        } else {
            var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
            var id = record.get('id');
            var row = document.getElementById(id);
            var footer = document.getElementById('card-footer-' + id);
            var msgPreview = document.getElementById('msg-preview-' + id);
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
        switch (record.get('conversation_type')) {
            case 'call':
                icon = 'fa fa-phone-square green-icon pointer';
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.recall[localStorage.getItem('languageSelected')] + '"';
                break;
            case 'voicemail':
                return '<div id="voicemail-' + record.get('id') + '" class="card-icon play" data-callback="reproduceVoicemail"><i class="fa fa-play green-icon pointer" aria-hidden="true"></i></div>'
                break;
            case 'fax':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.send_fax[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-file-text green-icon pointer';
                break;
            case 'sms':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.send_sms[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-envelope green-icon pointer';
                break;
            case 'chat':
                meta.tdAttr = 'data-qtip="' + Ngcp.csc.locales.conversations.tooltips.chat[localStorage.getItem('languageSelected')] + '"';
                icon = 'fa fa-comment green-icon pointer';
                break;
        };
        return Ext.String.format('<div class="{0}"></div>', icon);
    },

    saveSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }
});
