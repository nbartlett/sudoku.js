'use strict'; 

define(
    ['underscore', 'backbone', 'Util'],
    function(_, Backbone, Util) {

        var CellModel = Backbone.Model.extend({
            
            // additional required elements are
            // row and column
            defaults: { 
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true
            },

            initialize: function(args, options, row, column) {
                this.row = row;
                this.column = column;
                this.block = 3 * Math.floor((row - 1) / 3) + Math.floor((column - 1) / 3) + 1;
            },

            remaining: function() {
                return Util.reduceIndices(function(lst, idx){ 
                    if (this.attributes[idx]) {
                        lst.push(idx);
                        return lst;
                    } else return lst;
                } , [], this);
            },

            isSolved: function() {
                return this.remaining().length == 1;
            }, 

            setValue: function(idx) {
                 if (idx < 0 || idx > 9) {
                    throw "cannot set the possible value " + idx;
                } else {
                    Util.eachIndex(function(i){ 
                        if (i != idx) {
                            this.set(i, false);
                        } else {
                            this.set(i, true);
                        }
                    }, this);
                }
            },

            setNotPossible: function(idx) {
                if (idx < 0 || idx > 9) {
                    throw "cannot set the possible value " + idx;
                } else {
                    this.set(idx, false);
                }
            }
        });

        return CellModel;
    }
);
