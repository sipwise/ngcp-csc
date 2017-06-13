Ext.define('NgcpCsc.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            },
            '*': {
                showmessage: 'showMessage',
                showconfirmbox: 'showConfirmBox',
                updateconversationtitle: 'setSectionTitle',
                setCentralContentHeight: 'setCentralContentHeight'
            }
        },
        component: {
            '*': {
                cardContainerResized: 'cardContainerResized'
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
        me.toggleFilter();
        me.fireEvent('resetFilters');
        this.lookupReference('filterTxtSearch').setValue('');
        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function(tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));
        this.fireEvent('navSelectionChange');
        if (to) {
            if (node.parentNode) {
                node.parentNode.expand();
            }
            this.redirectTo(to);
            this.mainContainerResized();
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

    mainContainerResized: function(cmp) {
        var cmp = cmp || this.lookupReference('mainCardPanel');
        var navTree = this.lookupReference('navigationTreeList');
        var filterTxtSearch = this.lookupReference('filterTxtSearch');
        var filterTxtSearchWidth = (filterTxtSearch.getWidth() > 0) ? filterTxtSearch.getWidth() : 730;
        var offset = 95;
        var leftMargin = (cmp.getWidth() / 2) - (filterTxtSearchWidth / 2) - offset;
        if (leftMargin > 0 && Ext.os.is.Desktop) {
            filterTxtSearch.setMargin('0 0 0 ' + leftMargin);
        }
    },

    onRouteChange: function(id) {
        var vm = this.getViewModel();
        var toggleButton = this.lookupReference('headerToggleButton');
        this.setCurrentView(id);
        this.fireEvent('routeChange');
        this.setSectionTitle(id);
        if (id == 'inbox' || id == 'conversation-with' || id == 'pbxconfig/seats' || id == 'pbxconfig/groups' || id == 'pbxconfig/devices') {
            vm.set('headerBarFieldHideState', false);
        } else {
            vm.set('headerBarFieldHideState', true);
        };
    },

    setSectionTitle: function(id, record) {
        var vm = this.getViewModel();
        var title;
        switch (id) {
            case 'inbox':
                title = Ngcp.csc.locales.conversations.title[localStorage.getItem('languageSelected')];
                break;
            case 'conversation-with':
                if (!record) {
                    return;
                };
                title = Ngcp.csc.locales.conversationwith.title[localStorage.getItem('languageSelected')] + ' ' + record.get('name');
                break;
            case 'callforward/always':
                title = Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callforward.always_title[localStorage.getItem('languageSelected')];
                break;
            case 'callforward/afterhours':
                title = Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callforward.afterhours_title[localStorage.getItem('languageSelected')];
                break;
            case 'callforward/companyhours':
                title = Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callforward.companyhours_title[localStorage.getItem('languageSelected')];
                break;
            case 'callblock':
                title = Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')];
                break;
            case 'reminder':
                title = Ngcp.csc.locales.reminder.title[localStorage.getItem('languageSelected')];
                break;
            case 'password':
                title = Ngcp.csc.locales.password.title[localStorage.getItem('languageSelected')];
                break;
            case 'themeroller':
                title = Ngcp.csc.locales.themeroller.title[localStorage.getItem('languageSelected')];
                break;
            case 'pbxconfig/seats':
                title = Ngcp.csc.locales.pbxconfig.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.pbxconfig.seat_title[localStorage.getItem('languageSelected')];
                break;
            case 'pbxconfig/groups':
                title = Ngcp.csc.locales.pbxconfig.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.pbxconfig.group_title[localStorage.getItem('languageSelected')];
                break;
            case 'pbxconfig/devices':
                title = Ngcp.csc.locales.pbxconfig.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.pbxconfig.device_title[localStorage.getItem('languageSelected')];
                break;
            case 'pbxconfig/autoattendant':
                title = Ngcp.csc.locales.pbxconfig.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.pbxconfig.autoattendant_title[localStorage.getItem('languageSelected')];
                break;
            case 'account':
                title = Ngcp.csc.locales.account.title[localStorage.getItem('languageSelected')];
                break;
            case 'callblocking/incoming':
                title = Ngcp.csc.locales.callblocking.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callblocking.incoming_title[localStorage.getItem('languageSelected')];
                break;
            case 'callblocking/outgoing':
                title = Ngcp.csc.locales.callblocking.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callblocking.outgoing_title[localStorage.getItem('languageSelected')];
                break;
            case 'callblocking/privacy':
                title = Ngcp.csc.locales.callblocking.title[localStorage.getItem('languageSelected')] + Ngcp.csc.locales.callblocking.privacy_title[localStorage.getItem('languageSelected')];
                break;
            default:
                title = vm.get('sectionTitle');
        }
        vm.set('sectionTitle', title);
    },

    logout: function() {
        localStorage.removeItem('remember_me');
        location.reload();

    },

    showMessage: function(success, msg) {
        if (success) {
            Ext.toast({
                html: '<i class="' + Ngcp.csc.icons.check + '" aria-hidden="true"></i> ' + msg,
                align: 'tr',
                ui: 'toast-green',
                minWidth: 365,
                maxWidth: 365,
                autoCloseDelay: 5000
            });
        } else {
            Ext.toast({
                html: '<i class="' + Ngcp.csc.icons.exclamation + '" aria-hidden="true"></i> ' + msg,
                align: 'tr',
                ui: 'toast-red',
                minWidth: 365,
                maxWidth: 365,
                autoCloseDelay: 5000
            });
        };
    },

    showConfirmBox: function(title, question, msg, callbackEvent, callbackParams) {
        var me = this;
        Ext.Msg.show({
            title: title,
            message: question,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    me.fireEvent(callbackEvent, callbackParams);
                    me.fireEvent('showmessage', true, msg);
                }
            }
        });
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
            if(document.styleSheets[0]){
                document.styleSheets[0].addRule('.x-treelist-item-icon::before', 'line-height:' + currentItemsHeight + 'px !important');
                document.styleSheets[0].addRule('.x-treelist-item-tool:after', 'height:' + currentItemsHeight + 'px !important');
                document.styleSheets[0].addRule('.x-treelist-item-tool::before', 'line-height:' + currentItemsHeight + 'px !important');
            }
        }
        this.setCentralContentHeight();

    },

    getNavTreeNodesCount: function(parentNode, scope) {
        var me = scope || this;
        var navTree = this.lookupReference('navigationTreeList');
        var navTreeStore = navTree.getStore();
        var count = 0;
        Ext.each(parentNode ? parentNode.get('children') : navTreeStore.getRange(), function(node) {
            if (!(node.leaf || node.get('leaf'))) {
                count += me.getNavTreeNodesCount(node, me);
            }
            count++;
        });
        return count;
    },

    setCentralContentHeight: function() {
        var docBody = document.body,
            docElement = document.documentElement,
            height;
        if (typeof document.height !== 'undefined') {
            height = document.height // For webkit browsers
        } else {
            height = Math.max(docBody.scrollHeight, docBody.offsetHeight, docElement.clientHeight, docElement.scrollHeight, docElement.offsetHeight);
        }
        var mainToolbarHeight = this.lookupReference('mainToolbar').getHeight();
        var titleHeight = this.lookupReference('sectionTitle').getHeight();
        var activeTab = this.lookupReference('mainCardPanel').getLayout().getActiveItem();
        var gridFiltersHeight = this.lookupReference('gridFilters').getHeight();
        var newHeight = height - mainToolbarHeight - titleHeight - gridFiltersHeight;
        if (activeTab) {
            activeTab.setHeight(newHeight);
            this.fireEvent('focusLastMsg');
            this.fireEvent('resizeContactPanel', height - mainToolbarHeight);
        }
    },

    cardContainerResized: function(cmp) {
        var cmpEl = cmp.getEl();
        var contEl = this.lookupReference('mainCardPanel');
        var tbarEl = cmpEl.down('.x-toolbar');
        var gridEl = cmpEl.down('.card-grid');
        if (gridEl && contEl) {
            var contHeight = contEl.getHeight() - tbarEl.getHeight();
            var gridHeight = gridEl.getHeight();
            (gridHeight > contHeight) ? gridEl.addCls('extra-left'): gridEl.removeCls('extra-left');
        }
    },

    getStoreFromRoute: function (currentRoute) {
        switch (true) {
            case (currentRoute == '#inbox'):
                return 'Conversations';
                break;
            case (currentRoute == '#conversation-with'):
                return 'Notifications';
                break;
            case (currentRoute == '#pbxconfig/devices'):
                return 'Devices';
                break;
            case (currentRoute == '#pbxconfig/groups'):
                return 'Groups';
                break;
            case (currentRoute == '#pbxconfig/seats'):
                return 'Seats';
                break;
        };
    },

    newSearch: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        this.fireEvent('newSearchFieldInput', el, store);
    },

    toggleFilter: function() {
        this.fireEvent('toggleFilterForm');
    }

});
