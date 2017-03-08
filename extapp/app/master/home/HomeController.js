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
              pnl = me.getView();
        wnd = me.createFormWindow(model, opts, pnl);
          //  wnd = me.createFormWindow(model, opts);
        wnd.show();
    },
    createFormWindow: function (model, opts,pnl) {
        var me = this;
        var opts = opts || {};
        formOpt = {
            modal: true,
            pnl:pnl
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
        var me = this;
        pnl = this.getView();
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
    onSaveButtonClick: function (button, e, eOpts) {
        var me = this;
        var wnd = button.up('window');
        me.getLoadingMask(wnd);
        me.saveItem(me.getForm(me.getView()));
    },
    saveItem: function (form, closeWindow, callback) {
        closeWindow = Ext.isEmpty(closeWindow) ? true : false;
        var me = this;
        var view = me.getView();
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
                yes: Ext.lang.global.yes,
                no: Ext.lang.global.no
            },
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var model = form.getRecord();
                    model = me.updateModelDataForSave(form, model);
                    model.save({ // save the record to the server
                        success: function (record, operation) {
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
                                //var MsgBox = Ext.Msg.alert({
                                //    title: Ext.lang.global.appname,
                                //    message: "Data saved Sucessfully. Bitch !!!",
                                //    buttonText: {
                                //        ok: 'OK'
                                //    }
                                //});
                                //setTimeout(function () {
                                //    MsgBox.close();
                                //}, 2000);
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
                                    message: "Server side failure.",
                                    buttonText: {
                                        ok: Ext.lang.global.ok
                                    }
                                });
                            }
                            me.hideLoadingMask();
                        },
                        callback: function (record, operation, success) {
                            if (success) {
                                formOpt.pnl.query("#homeGrid")[0].store.reload();
                            }
                        }
                    }, me);
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
    },
    getLoadingMask: function (targetComponent) {
        var me = this;
        me.loadingMask = new Ext.LoadMask({
            msg: "Loading ....",
            target: targetComponent,
            baseCls: 'customLoadMask',
            useMsg: false
        });
        me.loadingMask.show();
    },
    getForm: function (panel) {
        var form = panel.query('form');
        if (form.length > 0) {
            return form[0];
        }
        return form;
    },
    updateModelDataForSave: function (form, model) {
        var me = this;
        model = form.getRecord();
        if (!model) {
            model = me.createModel(); //this case will come in case of new-record only
            model.set('id', null);
        }
        form.updateRecord(model); // update the record with the form data
        return model;
    },
    hideLoadingMask: function () {
        var me = this;
        if (me.loadingMask && !Ext.isEmpty(me.loadingMask)) {
            me.loadingMask.hide();
        }
    }
});