Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsTpl', {
    extend: 'Ext.view.View',

    xtype: 'voicemails-tpl',
    store: 'VoiceMails',
    itemSelector: 'div.ngcp-sm-card',
    emptyText: 'No voicemails available',
    layout: 'fit',

    listeners: {
        itemclick: 'clickSmCard'
    },

    initComponent: function() {
        var cardTpl = new Ext.XTemplate(
            '<div class="voicemails-outer">',
                '<tpl for=".">',
                    '<div class="voicemails-inner ngcp-sm-card">',
                        '<div class="voicemails-datarow"><i class="fa fa-envelope" aria-hidden="true"></i><h2 class="voicemails-h2">Voicemail</h2></div>',
                        '<div class="ngcp-card-hr"></div>',
                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Caller: {caller}</p></div>',
                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Duration: {duration}</p></div>',
                        '<div class="voicemails-datarow"><i class="fa fa-file-text-o" aria-hidden="true"></i><p>Time: {time}</p></div>',
                        '<div class="ngcp-card-hr"></div>',
                        '<div class="ngcp-card-icon-row">',
                            '<div class="ngcp-card-icon"><i class="fa fa-file-audio-o fa-2x" aria-hidden="true"></i></div>',
                            '<div class="ngcp-card-icon"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i></div>',
                            '<div class="ngcp-card-icon"><i class="fa fa-remove fa-2x" aria-hidden="true"></i></div>',
                        '</div>',
                    '</div>',
                '</tpl>',
            '</div>'
        );

        this.tpl = cardTpl,

        this.callParent();
    }

});
