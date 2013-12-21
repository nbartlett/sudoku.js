'use strict'; 

define(
    ['underscore'],
    function(_) {
        var indices = _.map(_.range(9), function(idx){ return idx + 1; });
        return {
            eachIndex: function(f, context){ _.each(indices, f, context || {}); },
            mapIndices: function(f, context){ return _.map(indices, f, context || {}); },
            reduceIndices: function(f, init, context){ return _.reduce(indices, f, init, context || {}); }
        }
    }
)

