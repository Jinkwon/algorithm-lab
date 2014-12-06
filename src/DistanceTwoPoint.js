var DistanceTwoPoint = function(pos1, pos2){
    var x = (pos2.x - pos1.x);
    var y = (pos2.y - pos1.y);
    return Math.sqrt(x*x + y*y);
};

exports = {
    DistanceTwoPoint : DistanceTwoPoint
};