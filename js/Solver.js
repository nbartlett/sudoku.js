'use strict'; 

define(
    ['jquery', 'underscore'],
    function($, _) {
        var solver = function(moves, auto) {

            console.log('using ' + moves.length + ' moves');
            var progressDiv = $('div#progress');

            // predifined for mutual recursion
            var findNextMove;
            var moveBuilder;
            var resetBuilder;

            // find the next move and highlight the cells
            findNextMove = function() {
                var move = _.find(moves, function(f){ return f(); });
                if (move == null) {
                    progressDiv.html('Cannot Solve! Implement some more sophisticated moves');
                    state = findNextMove;
                    return findNextMove;
                }
                var result = move();
                progressDiv.html(result.text);
                _.each(result.primary, function(cell){ cell.set('state', 'primary'); });
                _.each(result.secondary, function(cell){ cell.set('state', 'secondary'); });
                return moveBuilder(result);
            }

            // make the next move and prepare to reset
            moveBuilder = function(result) {
                return function() {
                    result.move();
                    return resetBuilder(result);
                };
            }

            // reset and set up for next move
            resetBuilder = function(result) {
                return function() {
                    _.each(result.primary, function(cell){ cell.resetState(); });
                    _.each(result.secondary, function(cell){ cell.resetState(); });
                    return findNextMove;
                }
            };

            if (auto) {
                var update = function(state) {
                    var state = state();
                    setTimeout(function(){ 
                        update(state);
                    }, 0);
                }
                update(findNextMove);
            } else {
                var state = findNextMove
                $('button#button').click(function() {
                    state = state();
                    console.log(state);
                });
            }
        }
        return solver
    }
);

