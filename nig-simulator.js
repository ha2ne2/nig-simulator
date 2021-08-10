// simlate([Decimal], [Decimal], number) : [Decimal]
function simlate(currPoints, gArray, gNumArray, resetBonus, timex, simulatePeriod){
    var points = [new Decimal(currPoints)];
    var interval = 60;
    var prevPoints = new Decimal(currPoints);
    var len = gArray.length;
    for (var i = 1; i < simulatePeriod; i++) {
        for (var j = len-1; 0 < j; j--) {
            gArray[j-1] = gArray[j-1].plus(gArray[j].times(gNumArray[j]).times(resetBonus).times(timex));
        }
        prevPoints = prevPoints.plus(gArray[0].times(gNumArray[0]).times(resetBonus).times(timex));
        if (i % interval == 0) {
            points.push(prevPoints);
        }
    }
    return points;
}

// convertDecimalArrayToNumberArray([Decimal]) : [Number]
// ex) convertDecimalArrayToLogNumberArray([1e+3, 2e+3, 9e+5]) => [1000, 2000, 900000]
function convertDecimalArrayToNumberArray(decimalArray){
    return decimalArray.map(function(n) {
        return n.toNumber();
    });
}

// convertDecimalArrayToLogNumberArray([Decimal]) : [Number]
// ex) convertDecimalArrayToLogNumberArray([1e+15, 5e+15, 9e+16]) => [15.0, 15.44, 16.88]
function convertDecimalArrayToLogNumberArray(decimalArray){
    return decimalArray.map(function(n) {
        var log10 = Math.floor(n.log10());
        return log10 + (n.div(new Decimal(10).pow(Math.floor(n.log10())))-1)/9;
    });
}