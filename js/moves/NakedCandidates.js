'use strict'; 

define(
    ['jquery', 'underscore'],
    function($, _) {
        
        // gets all unique grps of n-elements from the array elements
        var grps = function(n, elements) {
            if (elements.length < n) {
                return [];
            } else if (n == 1) {
                var it = grps(n, _.tail(elements));
                it.push([_.head(elements)]);
                return it;
            } else {
                var it = grps(n, _.tail(elements));
                var head = _.head(elements);
                return it.concat(_.map(grps(n-1, _.tail(elements)), function(grp) {
                    grp.push(head);
                    return grp;
                }));
            }
        }

        // factory method that returns an array of moves
        var nakedCandidates = function(board) {
            var indices = _.map(_.range(9), function(idx){ return idx + 1; });


            return grps(4, indices);
        };

        return nakedCandidates
    }
);

