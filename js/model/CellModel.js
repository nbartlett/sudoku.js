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

            remaining: function() {
                return Util.reduceIndices(function(s, idx){ 
                    if (this.attributes[idx]) return s + 1;
                    else return 1;
                } , 0, this);
            },

            isSolved: function() {
                return this.remaining() === 1;
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
