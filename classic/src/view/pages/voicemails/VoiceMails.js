Ext.define('NgcpCsc.view.pages.voicemails.VoiceMails', {
    extend: 'Ext.panel.Panel',

    xtype: 'voicemails',

    viewModel: 'voicemails',

    controller: 'voicemails',

    title: Ngcp.csc.locales.voicemails.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    initComponent: function() {
        var grid = Ext.create('NgcpCsc.view.pages.voicemails.VoiceMailsGrid', {
            bind: {
                title: '{month_summary}'
            }
        });

        this.items = [{
            userCls: 'big-70 small-100',
            xtype:'core-container',
            items: [{
                height: 60,
                html: Ngcp.csc.locales.voicemails.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                html: Ext.String.format('<div class="voicemails-heading">{0} {1}</div>', Ngcp.csc.locales.voicemails.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, grid]
        }];
        this.callParent();
    }
});
