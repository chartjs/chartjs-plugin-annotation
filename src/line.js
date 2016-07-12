// Line Annotation implementation
module.exports = function (Chart) {
    var horizontalKeyword = 'horizontal';
    var verticalKeyword = 'vertical';

    var LineAnnotation = Chart.Element.extend({

        draw: function (chartInstance, options) {
            var view = this._view;
            var ctx = chartInstance.chart.ctx;
            var scale = chartInstance.scales[options.scaleID];
            var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
            var chartArea = chartInstance.chartArea;
            // Canvas setup
            ctx.lineWidth = view.borderWidth;
            ctx.strokeStyle = view.borderColor;

            // Draw
            ctx.beginPath();
            ctx.moveTo(view.x1, view.y1);
            ctx.lineTo(view.x2, view.y2);
            ctx.stroke();
            //Verify that label has been specified, so that we don't add a null label.
            //TODO: Added customizable badge options, like: where to display the badge, left/right/center. or, Badge Border Color and Badge Background color. 
            //I would also like to add an option for different directional offsets, horizontalOffset, and VertOffset for example.
            //Current issue with background color is that it likes to disappear when you hover over any other element on the chart.
            if (options.label) {
                //draw the background of the badge.
                ctx.fillStyle = 'white';
                ctx.fillRect((chartArea.right / 2), pixel - 5, 35, 15);
                //Draw the border around the badge.
                ctx.fillStyle = view.borderColor;
                ctx.strokeRect((chartArea.right / 2), pixel - 5, 35, 15);
                //Draw the text of the badge.
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(options.label ? options.label : '', (chartArea.right / 2) + 5, pixel - 5);
            }
        }
    });

    function lineUpdate(obj, options, chartInstance) {
        var model = obj._model = obj._model || {};

        var scale = chartInstance.scales[options.scaleID];
        var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
        var chartArea = chartInstance.chartArea;

        if (!isNaN(pixel)) {
            if (options.mode == horizontalKeyword) {
                model.x1 = chartArea.left;
                model.x2 = chartArea.right;
                model.y1 = model.y2 = pixel;

            } else {
                model.y1 = chartArea.top;
                model.y2 = chartArea.bottom;
                model.x1 = model.x2 = pixel;
            }
        }
        model.borderColor = options.borderColor;
        model.borderWidth = options.borderWidth;

    }


    return {
        Constructor: LineAnnotation,
        update: lineUpdate
    };
};