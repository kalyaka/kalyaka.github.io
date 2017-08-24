sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.kalyaka.test.controller.Todos", {
       
        onInit: function () {
            this.aSearchFilters = [];
            this.aTabFilters = [];

            var oModel = this.getView().getModel('todosModel');
            this.getView().setModel(oModel, '');
        },

        addNewTodo: function () {
            var oModel = this.getView().getModel('todosModel');
            var aTodos = oModel.getProperty('/todos') || [];

            aTodos.push({
                title: oModel.getProperty('/newTodoTitle'),
                completed: false
            });

            oModel.setProperty('/todos', aTodos);
            oModel.setProperty('/newTodoTitle', '');
        },

        /**
         * Count not completed todos
         */
        updateTodosLeftCount: function () {
            var oModel = this.getView().getModel('todosModel');
            var aTodos = oModel.getProperty('/todos') || [];

            var leftCount = aTodos.filter(
                function (oTodo) {
                    return oTodo.completed !== true;
                }).length;

            oModel.setProperty('/todosCount', leftCount);
        },

        /**
         * Removes all completed items from the todo list.
         */
        clearCompletedTodos: function() {
            let oModel = this.getView().getModel('todosModel');
            let aTodos = oModel.getProperty('/todos') || [];

            let i = aTodos.length;
            while (i--) {
                let oTodo = aTodos[i];
                if (oTodo.completed) {
                    aTodos.splice(i, 1);
                }
            }

            oModel.setProperty('/todos', aTodos);
        },

        /**
         * search by title
         * @param {sap.ui.base.Event} oEvent event
         */
        onTodosSearch: function (oEvent) {
            let oModel = this.getView().getModel('todosModel');
            this.aSearchFilters = [];

            let query = oEvent.getSource().getValue();
            if (query && query.length > 0) {
                oModel.setProperty('/todosRemovable', false);
                this.aSearchFilters.push(new Filter("title", FilterOperator.Contains, query));
            } else {
                oModel.setProperty('/todosRemovable', true);
            }

            this._applyListFilters();
        },

        /**
         * filter by segmented button
         * @param {sap.ui.base.Event} oEvent event
         */
        onTodosFilter: function (oEvent) {
            this.aTabFilters = [];

            let key = oEvent.getParameter('key');
            switch (key) {
                case 'active':
                    this.aTabFilters.push( new Filter('completed', FilterOperator.EQ, false));
                    break;
                case 'completed':
                    this.aTabFilters.push( new Filter('completed', FilterOperator.EQ, true));
                    break;
                case 'all':
                default:

            }

            this._applyListFilters();
        },

        /**
         * Apply search and filter criteria
         * @private
         */
        _applyListFilters: function () {
            let oList = this.byId('todoList');
            let oBinding = oList.getBinding('items');

            oBinding.filter(this.aSearchFilters.concat(this.aTabFilters), 'todos');
        }
    });
});
