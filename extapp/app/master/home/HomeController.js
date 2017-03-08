Ext.define('app.master.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HomeController',
    requires: [
        'app.master.home.HomeFormWindow',
        'app.master.home.HomeStore'
    ],
    mainPanelSelector: '#homeListPanel',
    searchPanelSelector: '#search-form',
    gridPanelSelector: '#homeGrid',
    windowSelector: '#HomeFormWindow',
    init: function (application) {
        //here we have to register routes
        var me = this;
        me.callParent(arguments);
        config = me.getDefaultEventsConfig();
        me.control(config);
    },
    getDefaultEventsConfig: function () {
        var me = this,
            config = {},
            searchPanelSelector = me.searchPanelSelector || null,
            windowSelector = me.windowSelector || null,
            gridPanelSelector = me.gridPanelSelector || null,
            mainPanelSelector = me.mainPanelSelector || null;
        if (gridPanelSelector) {
            config[gridPanelSelector + " #newbutton"] = {
                click: 'onNewClick'
            };
            config[gridPanelSelector + " #reload-button"] = {
                click: 'onReloadButtonClick'
            };
        }
        if (searchPanelSelector) {
            config[searchPanelSelector + " #search-button"] = {
                click: 'onSearchClick'
            };
        }
        if (windowSelector) {
            config[windowSelector + " #cancel-button"] = {
                click: 'onCloseButtonClick'
            };
            config[windowSelector + " #save-button"] = {
                click: 'onSaveButtonClick'
            };
        }
        return config;
    },
    createModel: function (opts) {
        return new app.master.home.Model(opts);
    },
    onNewClick: function (argument) {
        var me = this,
            newModel = me.createModel();
        me.openFormWindow(newModel);
    },
    openFormWindow: function (model) {
        var me = this,
            opts = {},
            wnd = me.createFormWindow(model, opts);
        wnd.show();
    },
    createFormWindow: function (model, opts) {
        var me = this;
        var opts = opts || {};
        formOpt = {
            modal: true
        };
        formOpt.viewModel = {
            data: {
                item: model
            }
        };
        Ext.merge(formOpt, opts);
        formOpt.controller = new app.master.home.HomeController();
        return new app.master.home.HomeFormWindow(formOpt);
    },
    onSearchClick: function (btn, eOpts) {
        var me=this;
        pnl =this.getView();
          //pnl.setLoading(true);
        grid = pnl.query("#homeGrid")[0];
        grid.store.load();
            //pnl.setLoading(false);
        // grid.store.load({
        //     // params: {
        //     //     group: 3,
        //     //     type: 'user'
        //     // },
        //     //params: me.getSearchParam(),
        //     callback: function(records, operation, success) {
        //       debugger;
        //             idea=Ext.decode(operation._response.responseText);
        //            alert(idea);
        //         setTimeout(function() {
        //             grid.setLoading(false);
        //         }, 300);
        //     },
        //     scope: me
        // });
    },
    onSaveButtonClick: function (btn, eOpts) {
        var me = this;
        var form = me.getView().query('form')[0];
        me.saveItem(form, true, true);
    },
    saveItem: function (form, closeWindow, callback) {
        debugger;
        closeWindow = Ext.isEmpty(closeWindow) ? true : false;
        var me = this;
        //validate data
        if (!form.isValid()) {
            // display error alert if the data is invalid
            //Ext.Msg.alert(Ext.lang.global.appname, Ext.lang.global.form_required_valid);
            //return;
            Ext.Msg.show({
                title: Ext.lang.global.appname,
                closeToolText: Ext.lang.global.cancel,
                message: Ext.lang.global.form_required_valid,
                icon: Ext.Msg.WARNING,
                buttonText: {
                    ok: Ext.lang.global.ok
                }
            });
            me.hideLoadingMask();
            return;

        }

        //confirm before save
        Ext.Msg.show({
            title: Ext.lang.global.appname,
            message: Ext.lang.global.Save_Msg,
            closeToolText: Ext.lang.global.cancel,
            //buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: Ext.lang.global.ho,
                no: Ext.lang.global.hoina
            },
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var model = form.getRecord();
                    model1 = me.createModel();
                    model = form.updateRecord(model);
                    // if (!model){
                    //     model = me.createModel(); //this case will come in case of new-record only
                    //     model.set(id, null);
                    // }
                    // form.updateRecord(model); // update the record with the form data
                    //model = me.updateModelDataForSave(form, model);
                    model.save({ // save the record to the server
                        success: function (record, operation) {
                            // Ext.Msg.alert('Success', 'Data saved successfully.', function(){
                            var resp = Ext.decode(operation._response.responseText);
                            //me.beforeSaveComplete(record, resp);
                            if (Ext.isFunction(callback)) {
                                callback({
                                    status: 'success'
                                });
                            }
                            if (closeWindow) {
                                var wnd = me.getView();

                                wnd.dataSaved = true;
                                wnd.closeMe = true;
                                //wnd.setLoading(false);
                                me.hideLoadingMask();
                                wnd.close();
                            }
                        },
                        failure: function (record, message) {
                            if (Ext.isFunction(callback)) {
                                callback({
                                    status: 'failed'
                                });
                            }
                            var resp;
                            if (message._response !== null)
                                resp = Ext.decode(message._response.responseText);
                            if (message.error.statusText == "communication failure")
                                Ext.Msg.alert(Ext.lang.global.appname, 'Time out session expire, By client side...');
                            else {
                                Ext.Msg.alert({
                                    title: Ext.lang.global.Save_fail,
                                    message: Myro.Utility.combineAllErrorMsg(resp.errors, resp.validation_errors),
                                    buttonText: {
                                        ok: Ext.lang.global.ok
                                    }
                                });
                            }
                            me.hideLoadingMask();
                        }
                    });
                } else if (btn === 'no') {
                    if (Ext.isFunction(callback)) {
                        callback({
                            status: 'cancel'
                        });
                    }
                    me.hideLoadingMask();
                    return false;
                } else {
                    if (Ext.isFunction(callback)) {
                        callback({
                            status: 'cancel'
                        });
                    }
                    me.hideLoadingMask();
                    return false;
                }
            }
        });
        //
    },
    onCloseButtonClick: function (btn, eOpts) {
        win = btn.up('window');
        win.close();
        // body...
    },
    onReloadButtonClick: function (btn, eOpts) {
        grid = btn.up('grid');
        grid.setLoading(true);
        grid.store.loadData([], false);
        grid.setLoading(false);
        // body...
    }
});