Ext.define('app.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainViewController',
	requires:[
	'app.route.route'
	],
	init: function(application) {
		//here we have to register routes
		var me = this;
		me.registerRoutes();
		me.callParent(arguments);
		// body...
	},
	registerRoutes: function() {
		var me = this,
			routes = app.route.route.routes;
		me.setRoutes(routes);
	},
	onHomePage: function() {
		var me = this,
			mainContent = me.getView().query('#mainContent')[0];
		//Tax.Command.getLoadingMask(mainContent);
		//me.getLoadingMask(mainContent);
		var tokenArr = Ext.History.currentToken.split("/");
		if (tokenArr.length > 0) {
			this.diplayListPanel(tokenArr[0]);
		}
	},

	 getLoadingMask: function(targetComponent) {
        var me = this;
        me.loadingMask = new Ext.LoadMask({
            msg: "Loading ....",
            target: targetComponent,
            baseCls: 'customLoadMask',
            useMsg: false
        });
        me.loadingMask.show();
    },
     diplayListPanel: function(routeString) {
        var me = this,
            viewModel = me.getViewModel(),
            navItemsStore = viewModel.data.navItems;
        var route = routeString;
        var selectedTreeListItem = null;
        selectedTreeListItem = navItemsStore.findNode("route", route);
        if (selectedTreeListItem) {
            return me.loadBodyPanel(viewModel, selectedTreeListItem);
        } else {
            Ext.Msg.alert("ERROR", "Invalid route");
            return false;
        }
    },
    loadBodyPanel: function (viewmodel, selectedTreeListItem) {
        var currentView = selectedTreeListItem.data.itemId,
            menuData = selectedTreeListItem.data;
        //check whether file exist 
        var fileExist = Ext.ClassManager.getByAlias('widget.' + currentView);
        if (typeof(fileExist) == 'undefined') {
            var menus = Ext.create(menuData.dependent_class);
            if (menus.requires_lazy) {
                Ext.require(menus.requires_lazy, function() {
                    fileExist = Ext.ClassManager.getByAlias('widget.' + currentView);
                    if (typeof(fileExist) == 'undefined') {
                        Ext.Msg.alert('File not Found', 'Form does not exists');
                    } else {
                        var mainContent = viewmodel.getView('menu').query('container[itemId=mainContent]')[0];
                        if (mainContent.query("#" + currentView).length === 0) {
                            mainContent.removeAll(true);
                            mainContent.add({
                                xtype: currentView,
                                menuData: menuData
                            });
                        }
                        return mainContent.query(currentView)[0];
                        //return mainContent.query("#" + currentView)[0];
                    }
                });
            }
            return false;
        } else {
            var mainContent = viewmodel.getView('menu').query('container[itemId=mainContent]')[0];
            if (mainContent.query("#" + currentView).length === 0) {
                mainContent.removeAll(true);
                mainContent.add({
                    xtype: currentView
                });
            }
            return mainContent.query(currentView)[0];
            //return mainContent.query("#" + currentView)[0];
        }
    },
    hideLoadingMask: function() {
        var me = this;
        if (me.loadingMask && !Ext.isEmpty(me.loadingMask)) {            
            me.loadingMask.hide();        
        }
    }
});