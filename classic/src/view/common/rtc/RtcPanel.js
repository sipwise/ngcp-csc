Ext.define('NgcpCsc.view.common.rtc.RtcPanel', {
    extend: 'Ext.panel.Panel',

    id: 'rtcpanel',
    xtype: 'rtc',

    controller: 'rtc',
    viewModel: 'rtc',

    padding: '0 0 0 1',
    width: '30%',
    closable: true,
    collapseDirection: 'left',
    cls: 'rtc-panel',

    bind: {
        title: '{title}'
    },

    tools: [{
        glyph: 'xf065@FontAwesome',
        callback: 'toggleFullscreen',
        bind: {
            hidden: '{!videoEnabled}'
        }
    }, {
        type: 'minimize',
        callback: 'minimizeRtcPanel'
    }],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        beforeclose: 'onBeforeClose'
    },

    items: [{
        xtype: 'phone-composer'
    }, {
        xtype: 'call-panel'
    }]
});
