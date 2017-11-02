/**
 * This File represents the logic behind the visualization.
 * In this logic, we are presenting an histogram, that represents the
 * ratio between Delayed flights, grouping by the day of the week.
 *
 * In this file, Delayed is defined with 0 minutes of delay or more.
 */


var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2) + 20 )
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Precentage of delays on each day of the week on 2016");

d3.json("data.json", function(error, jsonData) {

    var data = []
    for (var key in jsonData){
        data.push({Letter:jsonData[key].day, Freq: jsonData[key].precent})
    }

    x.domain(data.map(function(d) { return d.Letter; }));
    y.domain([0, 50]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-13")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 8)
        .attr("dy", ".21em")
        .style("text-anchor", "end")
        .text("Percentage");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Letter); })
        .attr("width", 60)
        .attr("y", function(d) { return y(d.Freq); })
        .attr("height", function(d) { return height - y(d.Freq); })
});