var bv
require.config({ baseUrl: 'js/',
    paths: {
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'jquery': 'lib/jquery'
    },
    shim: {
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' }
    }
});

require(
    [
        'jquery', 
        'underscore',
        'Util',
        'Board',
        'model/CellModel',
        'view/CellView'
    ],
    function($, _, Util, Board, CellModel, CellView) {

        var cells = _.flatten(Util.mapIndices(function(row){
            return Util.mapIndices(function(col) {
                return new CellModel({}, {},  row, col);
            });
        }));

        _.each(cells, function(cell) {
            cell.setNotPossible(8);
            cell.setNotPossible(2);
            cell.setNotPossible(4);
        });

        cells[0].setValue(1);

        _.each(cells, function(cell) {
            var el = $('div#board #row' + cell.row + '-col' + cell.column);
            new CellView({ model: cell, el: el});
        });

        var board = new Board(cells);
    }
);
