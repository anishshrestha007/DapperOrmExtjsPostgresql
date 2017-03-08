Ext.define('app.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MainViewModel',
    requires: [
        'app.view.main.menu.master.General'
    ],
    constructor: function(config) {
        var me = this;
        menuObj = me.initializeMenu();
        var navItems = null;
        navItems = {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Home',
                    iconCls: 'x-fa fa-home',
                    children: [
                        menuObj.masterGeneral
                    ]
                }, {
                    text: 'Users',
                    iconCls: 'x-fa fa-user',
                    children: [{
                        text: 'Tagged',
                        iconCls: 'x-fa fa-tag',
                        leaf: true
                    }, {
                        text: 'Inactive',
                        iconCls: 'x-fa fa-trash',
                        leaf: true
                    }]
                }, {
                    text: 'Groups',
                    iconCls: 'x-fa fa-group',
                    leaf: true
                }, {
                    text: 'Settings',
                    iconCls: 'x-fa fa-wrench',
                    children: [{
                        text: 'Sharing',
                        iconCls: 'x-fa fa-share-alt',
                        leaf: true
                    }, {
                        text: 'Notifications',
                        iconCls: 'x-fa fa-flag',
                        leaf: true
                    }, {
                        text: 'Network',
                        iconCls: 'x-fa fa-signal',
                        leaf: true
                    }]
                }]
            }
        };
        config.stores = {
            navItems: navItems
        };
        return this.callParent(arguments);
    },
    formulas: {
        selectionText1: function(get) {
            var selection = get('treelist.selection');
            if (selection) {
                var treeNodeItemId = selection.data.itemId;
                if (typeof(treeNodeItemId) != 'undefined' && !Ext.isEmpty(treeNodeItemId)) {
                    var menuList = this.getView().query('#menuList')[0];
                    menuList.unfloatAll();
                    this.getView().getController().redirectTo(selection.data.route);
                } else {
                    return false;
                }
            } else {
                return 'No node selected';
            }
        }
    },
    initializeMenu: function(argument) {
        var menuObj = {};
        mstHomeListPanelObj = new app.view.main.menu.master.General();
        menuObj.masterGeneral = mstHomeListPanelObj.general;
        return menuObj;
    }

});