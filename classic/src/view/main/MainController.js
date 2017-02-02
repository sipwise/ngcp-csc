Ext.define('NgcpCsc.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            },
            '*': {
                showmessage: 'showMessage'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
            store.findNode('viewType', hashTag) || 'inbox',
            view = (node && node.get('viewType')),
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        if (!view) {
            return;
        }

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                scrollable: true,
                cls: 'section-container',
                routeId: hashTag, // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            } else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function(tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            if (node.parentNode) {
                node.parentNode.expand();
            }
            this.redirectTo(to);
        }
    },
    onToggleNavigationSize: function() {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.logo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout(); // ... since this will flush them
        } else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.logo.animate({
                dynamic: true,
                to: {
                    width: new_width
                }
            });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({
                isRoot: true
            });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function() {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender: function() {
        if (!window.location.hash) {
            this.redirectTo("inbox");
        }
    },

    mainContainerResized: function(cmp){
        var navTree = this.lookupReference('navigationTreeList');
        var filterTxtSearch = this.lookupReference('filterTxtSearch');
        var offset = 100;
        var leftMargin = (cmp.getWidth() / 2) - (filterTxtSearch.getWidth()/2) - offset;
        if(leftMargin > 0 && Ext.os.is.Desktop){
            filterTxtSearch.setMargin('0 0 0 ' + leftMargin);
        }
    },

    onRouteChange: function(id) {
        var vm = this.getViewModel();
        this.setCurrentView(id);
        this.fireEvent('routeChange');
        if (id == 'inbox' || id == 'pbxconfig/seats' || id == 'pbxconfig/groups' || id == 'pbxconfig/devices') {
            vm.set('headerBarFieldHideState', false);
        } else {
            vm.set('headerBarFieldHideState', true);
        };
    },

    logout: function() {
        localStorage.removeItem('remember_me');
        location.reload();

    },

    showMessage: function(success, msg) {
        if (success) {
            Ext.toast({
                html: msg,
                align: 't',
                ui: 'toast-green'
            });
        } else {
            Ext.toast({
                html: msg,
                align: 't',
                ui: 'toast-red'
            });
        };
    },

    setItemsSize: function(view) {
        var defaultHeight = view.down('#headerBar').getHeight();
        var currentMainViewHeight = view.getHeight() - defaultHeight; // tbar height
        var navItemsCount = this.getNavTreeNodesCount();
        var navTree = this.lookupReference('navigationTreeList');
        var currentItemsHeight = Math.floor(currentMainViewHeight / navItemsCount);
        var nodes;
        if (currentItemsHeight > 42) { // == $panel-navigation-item-line-height in all.scss
            nodes = Ext.Array.merge(
                                    navTree.getEl().query('.x-treelist-row'),
                                    navTree.getEl().query('.x-treelist-item-tool'),
                                    navTree.getEl().query('.x-treelist-item-text'),
                                    navTree.getEl().query('.x-treelist-item-icon'),
                                    navTree.getEl().query('.x-treelist-item-expander'));
            Ext.each(nodes, function(node) {
                node.style.setProperty('height', currentItemsHeight + 'px', 'important');
                node.style.setProperty('line-height', currentItemsHeight + 'px', 'important');
            });

            // override pseudo element (can also be done using http://docs.sencha.com/extjs/6.2.0/classic/Ext.util.CSS.html#method-createStyleSheet)
            document.styleSheets[0].addRule('.x-treelist-item-icon::before', 'line-height:' + currentItemsHeight + 'px !important');
            document.styleSheets[0].addRule('.x-treelist-item-tool:after', 'height:' + currentItemsHeight + 'px !important');
            document.styleSheets[0].addRule('.x-treelist-item-tool::before', 'line-height:' + currentItemsHeight + 'px !important');
        }

    },

    getNavTreeNodesCount: function(parentNode, scope) {
        var me = scope || this;
        var navTree = this.lookupReference('navigationTreeList');
        var navTreeStore = navTree.getStore();
        var count = 0;
        Ext.each(parentNode ? parentNode.get('children') : navTreeStore.getRange(), function(node) {
            if(!(node.leaf || node.get('leaf'))) {
                count += me.getNavTreeNodesCount(node, me);
            }
            count++;
        });
        return count;
    },

    newSearch: function (el) {
        this.fireEvent('newSearchFieldInput', el);
    },

    toggleFilter: function () {
        this.fireEvent('toggleFilterForm');
    },

    toggleFree: function () {
        this.fireEvent('toggleFreeSearch');
    }

});
