var ClockDegree = function(hour, min){
    var minAngle = 6 * min;
    var minPercent = min / 60;
    var hourAngle = (hour % 12) * 30 + (30 * minPercent);

    return Math.abs(hourAngle - minAngle);
};

exports = {
    ClockDegree : ClockDegree
};