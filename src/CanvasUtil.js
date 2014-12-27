
$(function() {

    var canvas = document.getElementById('drawing');
    var ctx = canvas.getContext('2d');

    // Functions from blog tutorial
    function drawFilledPolygon(canvas,shape)/*{{{*/
    {
        canvas.beginPath();
        canvas.moveTo(shape[0][0],shape[0][1]);

        for(p in shape)
            if (p > 0) canvas.lineTo(shape[p][0],shape[p][1]);

        canvas.lineTo(shape[0][0],shape[0][1]);
        canvas.fill();
    };
    /*}}}*/
    function translateShape(shape,x,y)/*{{{*/
    {
        var rv = [];
        for(p in shape)
            rv.push([ shape[p][0] + x, shape[p][1] + y ]);
        return rv;
    };
    /*}}}*/
    function rotateShape(shape,ang)/*{{{*/
    {
        var rv = [];
        for(p in shape)
            rv.push(rotatePoint(ang,shape[p][0],shape[p][1]));
        return rv;
    };
    /*}}}*/
    function rotatePoint(ang,x,y)/*{{{*/
    {
        return [
            (x * Math.cos(ang)) - (y * Math.sin(ang)),
            (x * Math.sin(ang)) + (y * Math.cos(ang))
        ];
    };
    /*}}}*/
    function drawLineArrow(canvas,x1,y1,x2,y2) /*{{{*/
    {
        canvas.beginPath();
        canvas.moveTo(x1,y1);
        canvas.lineTo(x2,y2);
        canvas.stroke();
        var ang = Math.atan2(y2-y1,x2-x1);
        drawFilledPolygon(canvas,translateShape(rotateShape(arrow_shape,ang),x2,y2));
    };
    /*}}}*/

    function redrawLine(canvas,x1,y1,x2,y2)/*{{{*/
    {
        canvas.clearRect(0,0,maxx,maxy);
        drawLineArrow(canvas,x1,y1,x2,y2);
    };
    /*}}}*/

    // Event handlers
    function mDown(e)/*{{{*/
    {
        $(document.body).css('cursor','none');
        read_position();
        var p = get_offset(e);
        if ((p[0] < 0) || (p[1] < 0)) return;
        if ((p[0] > maxx) || (p[1] > maxy)) return;
        drawing = true;
        ox = p[0];
        oy = p[1];
        return nothing(e);
    };
    /*}}}*/
    function mMove(e)/*{{{*/
    {
        if (!!drawing)
        {
            var p = get_offset(e);
            // Constrain the line to the canvas...
            if (p[0] < 0) p[0] = 0;
            if (p[1] < 0) p[1] = 0;
            if (p[0] > maxx) p[0] = maxx;
            if (p[1] > maxy) p[1] = maxy;
            redrawLine(ctx,ox,oy,p[0],p[1]);
        }
        return nothing(e);
    };
    /*}}}*/
    function mDone(e)/*{{{*/
    {
        if (drawing) {
            var p = get_offset(e);
            $(document.body).css('cursor','auto');
            debug_msg(['Draw Arrow',ox,oy,p[0],p[1]].toString());
            drawing = false;
            return mMove(e);
        }
    };
    /*}}}*/
    function nothing(e)/*{{{*/
    {
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    /*}}}*/
    function read_position()/*{{{*/
    {
        var o = $obj.position();
        yoff = o.top;
        xoff = o.left;
    };
    /*}}}*/
    function get_offset(e)/*{{{*/
    {
        return [ e.pageX - xoff, e.pageY - yoff ];
    };
    /*}}}*/
    function debug_msg(msg)/*{{{*/
    {
        if (debug_ctr > debug_clr) {
            $('#debug').children().remove();
            debug_ctr = 0;
        }
        debug_ctr++;
        $('#debug').append('<div>'+msg+'</div>');
    };
    /*}}}*/

    var arrow_shape = [
        [ -10, -4 ],
        [ -8, 0 ],
        [ -10, 4 ],
        [ 2, 0 ]
    ];

    var debug_ctr = 0;
    var debug_clr = 12;
    var $obj = $('#drawing');
    var maxx = 600, maxy = 400;
    var xoff,yoff;
    var ox,oy;
    var drawing;

    var attach_to = $.browser.msie ? '#drawing' : window;
    $(attach_to)
        .mousedown(mDown)
        .mousemove(mMove)
        .mouseup(mDone)
    ;

});