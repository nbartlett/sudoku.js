'use strict'; 

define(
    ['jquery', 'underscore'],
    function($, _) {
        var getMoves = function(board) {
            // all moves to be returned by this module
            var moves = [];

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

            // create moves for n-tuples within a give row, column, or block
            var process = function(n, cells) {
                var perms = grps(n, cells);
                _.each(perms, function(perm) {

                    var move = function() {
                        var remaining = perm[0].remaining();
                        if (remaining.length == n) {
                            if (
                                _.reduce(perm, function(bool, cell) {
                                    return _.isEqual(remaining, cell.remaining()) && bool;
                                }, true)
                            ) {
                                var secondary = _.filter(cells, function(cell) {
                                    return !_.contains(perm, cell) && (_.intersection(remaining, cell.remaining()).length > 0)
                                });
                                if (secondary.length > 0) {
                                    return {
                                        text: 'Naked-' + n + '-Tuple',
                                        reusable: false,
                                        primary: perm,
                                        secondary: secondary,
                                        move: function(){ 
                                            _.each(secondary, function(cell){
                                                _.each(remaining, function(idx){ cell.setNotPossible(idx); });
                                            });
                                        }
                                    }
                                } else {
                                    return null;
                                }
                            }
                        }
                    };

                    moves.push(move);
                });
            };

            _.each(board.columns, function(column){ 
                _.each(_.range(4), function(n) {
                    process(n + 1, column);
                });
            });

            _.each(board.rows, function(row){ 
                _.each(_.range(4), function(n) {
                    process(n + 1, row);
                });
            });

            _.each(board.blocks, function(block){ 
                _.each(_.range(4), function(n) {
                    process(n + 1, block);
                });
            });

            return moves;
        };

        return getMoves;
    }
);

