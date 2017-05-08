Ext.define('NgcpCsc.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    init: function (view) {
        var me = this,
            refs = me.getReferences();
        me.callParent([ view ]);
        me.nav = refs.navigation;
        me.navigationTree = refs.navigationTree;
    },

    onNavigationItemClick:function(){
      // do nothing
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));
        if (to) {
            this.redirectTo(to);
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },
    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || 'desktop').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCard,
            navigationTree = me.navigationTree,
            store = navigationTree.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            item = mainCard.child('component[routeId=' + hashTag + ']');
        if (!item) {
            item = mainCard.add({
                xtype: node.get('viewType'),
                routeId: hashTag
            });
        }
        mainCard.setActiveItem(item);
        navigationTree.setSelection(node);
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                refs = me.getReferences(),
                navigation = me.nav,
                navigationTree = refs.navigationTree,
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }
        }
    },

    toolbarButtonClick: function(btn){
        var href = btn.config.href;
        this.redirectTo(href);
    }
});
