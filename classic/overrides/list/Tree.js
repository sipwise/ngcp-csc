Ext.define('NgcpCsc.override.list.Tree', {
    override: 'Ext.list.Tree',


    constructor: function(config) {
        var me = this;


        me.callSuper([config]);
        // Important to publish the value here, so the vm can
        // will know our intial state.
        me.publishState('selection', me.getSelection());


        // Track size so that we can track the expanded size
        // for use by the floated state of items when in micro mode.
        // Browsers where this event is not supported, fall back to a width
        // of 200px for floated tree items.
        if (!Ext.isIE8) {
            me.el.on({
                resize: 'onElResize',
                buffer: 300,
                scope: me
            });
        }
    },


    destroy: function() {
        var me = this;


        me.unfloatAll();
        me.activeFloater = null;
        me.setSelection(null);
        me.setStore(null);
        me.callSuper();
    },


    onElResize: function(el, details) {
        this.expandedWidth = details.width;
    },


    updateUi: function(ui, oldValue) {
        var me = this,
            el = me.element,
            uiPrefix = me.uiPrefix;


        if (oldValue) {
            el.removeCls(uiPrefix + oldValue);
        }
        if (ui) {
            el.addCls(uiPrefix + ui);
        }


        // Ensure that the cached iconSize is read from the style.
        delete me.iconSize;
        me.syncIconSize();
    }
});
