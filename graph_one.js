
document.addEventListener('DOMContentLoaded', function(e) {

// set the dimensions and margins of the graph
var margin = {top: 50, right: 180, bottom: 120, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://smartrestartch.s3.eu-central-1.amazonaws.com/lastupdate.csv", function(data) {
  lastupdatestring=data[0]['lastupdate'];
});

//Read the data
d3.csv("https://smartrestartch.s3.eu-central-1.amazonaws.com/data.csv", function(data) {
    // List of groups (here I have one group per column)
    var allGroup = ["Free_Viral"];
    var secondGroup = ["Value_Infectious"];

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.Datum, value: +d[grpName]};
        })
      };
    });

    var dataReady2 = secondGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.Datum, value: +d[grpName]};
        })
      };
    });

        // List of groups (here I have one group per column)
        var allGroupPlus = ["Free_Viral_Plus"];
        var secondGroupPlus = ["Value_Infectious_Plus"];

        // Reformat the data: we need an array of arrays of {x, y} tuples
        var dataReadyPlus = allGroupPlus.map( function(grpName) { // .map allows to do something for each element of the list
          return {
            name: grpName,
            values: data.map(function(d) {
              return {time: d.Datum, value: +d[grpName]};
            })
          };
        });
    var dataReady2Plus = secondGroupPlus.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.Datum, value: +d[grpName]};
        })
      };
    });

    // List of groups (here I have one group per column)
    var allGroupOpt = ["Free_Viral_Opt"];
    var secondGroupOpt = ["Value_Infectious_Opt"];

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReadyOpt = allGroupOpt.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.Datum, value: +d[grpName]};
        })
      };
    });
var dataReady2Opt = secondGroupOpt.map( function(grpName) { // .map allows to do something for each element of the list
  return {
    name: grpName,
    values: data.map(function(d) {
      return {time: d.Datum, value: +d[grpName]};
    })
  };
});

// List of groups (here I have one group per column)
var allGroupPess = ["Free_Viral_Pess"];
var secondGroupPess = ["Value_Infectious_Pess"];

// Reformat the data: we need an array of arrays of {x, y} tuples
var dataReadyPess = allGroupPess.map( function(grpName) { // .map allows to do something for each element of the list
  return {
    name: grpName,
    values: data.map(function(d) {
      return {time: d.Datum, value: +d[grpName]};
    })
  };
});
var dataReady2Pess = secondGroupPess.map( function(grpName) { // .map allows to do something for each element of the list
return {
name: grpName,
values: data.map(function(d) {
  return {time: d.Datum, value: +d[grpName]};
})
};
});

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeCategory10);

    // Add X axis --> it is a date format
    //var x = d3.scaleLinear()
    //  .domain([0,10])
    //  .range([ 0, width ]);
    var x = d3.scaleTime()
  .rangeRound([0, width]);



  var xFormat = "%d-%b-%Y";;
  var parseTime = d3.timeParse("%Y-%m-%d");
  //x.domain(d3.extent(data, function(d) { return parseTime(d.Datum); }));
  x.domain([parseTime(document.getElementById("xachsestart1").value),parseTime(document.getElementById("xachseende1").value)]);
  var x_axis = d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)).ticks(d3.timeFormat.month, 2);
  svg.append("g")
  .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")")
  //  .call(d3.axisBottom(x));
  .call(x_axis) ;




    // Add Y axis
    var y = d3.scaleLinear()
      //.domain( [0,20000])
      .range([ height, 0 ]);




      var calc_zmax= d3.format(".1f")(d3.max(data, function(d) { return +d.Value_Infectious; }));
      var z = d3.scaleLinear()
        .domain( [0,calc_zmax])
        .range([ height, 0 ]);
        document.getElementById("ryachse1").value=calc_zmax;
        var z_axis = d3.axisRight(z);
      svg.append("g")
      .attr("class", "zaxis")
      .attr("transform", "translate( " + width + ", 0 )")
        .call(z_axis);






var calc_ymax= d3.format(".2r")(d3.max(data, function(d) { return +(d.Free_Viral); }));
      	y.domain([0,calc_ymax]);
        document.getElementById("lyachse1").value=calc_ymax;
                  //d3.max(data, function(d) { return +d.Free_Viral; })]);
                    //allGroup.map( function(d) {
                    //console.log(d3.max(d.value.values));
                    //return d3.max(d.value.values);
                  //}))]);

                  //svg.append("g")
                  //  .call(d3.axisLeft(y));

                  var yAxis = d3.axisLeft(y);
                  //var yAxis = d3.axis()
      //.orient("left")
      //.scale(y);

      svg.append("g")
         .attr("class", "yaxis")
     .attr("transform", "translate("+0+",0)")
     .call(yAxis);
     //svg.append("g")
    //    .attr("class", "yaxis")
    //.attr("transform", "translate("+0+",0)")
    //.call(z_axis);


     function update(inputWert,welches) {
       x.domain([parseTime(document.getElementById("xachsestart1").value),parseTime(document.getElementById("xachseende1").value)]);
       switch(welches) {
         case "lyachse":  console.log("lyachse"); y.domain([0,inputWert]);
         d3.select(".yaxis").transition().duration(1000).call(d3.axisLeft(y)); break;
         case "ryachse":  z.domain([0,inputWert]);
         d3.select(".zaxis").transition().duration(1000).call(d3.axisRight(z)); break;
         case "xachsestart":
         d3.select(".xaxis").transition().duration(1000).call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)).ticks(d3.timeFormat.month, 2)); break;
         case "xachseende":
         d3.select(".xaxis").transition().duration(1000).call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)).ticks(d3.timeFormat.month, 2)); break;
         case "start": console.log("printing graphic");break;
       }


       // Clipping
       svg.append('defs')
       	.append('clipPath')
       	.attr('id', 'clip')
       	.append('rect')
       		.attr('x', 0)
          	.attr('y', 0)
       		.attr('width', width)
       		.attr('height', height);

          //var main = svg.append('g')
          //	.attr('class', 'main')
          //	.attr('clip-path', 'url(#clip)');

 // Add the lines
     var u = svg.selectAll(".myLines")
 .data(dataReady);



 var line = d3.line()
   .x(function(d) { return x(parseTime(d.time)); })
   .y(function(d) { return y(+d.value) })
   u
     .enter()
     .append("path").attr('clip-path', 'url(#clip)')

     //.attr("class", "myLines")
     .attr("class", function(d){ return "myLines "+d.name })
     //.attr("class", "myLines")


     .merge(u)
.transition()
.duration(1000)

       .attr("d", function(d){ return line(d.values) } )
       .attr("stroke", function(d){ return myColor(d.name) })
       .style("stroke-width", 2)
       .style("fill", "none")





    //svg.selectAll("myLines")
    //  .data(dataReady)
    //  .enter()
    //  .append("path").attr('clip-path', 'url(#clip)')
    //    .attr("class", function(d){ return d.name })
    //    .attr("d", function(d){ return line(d.values) } )
    //    .attr("stroke", function(d){ return myColor(d.name) })
    //    .style("stroke-width", 2)
    //    .style("fill", "none")
    //    .append("svg:title")
    //      .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

        var movLine = d3.line()
    .x(function(d) { return x(parseTime(d.time)); })
    .y(function(d) { return y(+d.value) })
    //.interpolate(movingAvg(7))

    var u = svg.selectAll(".movMyLines")
.data(dataReady);

    u
      .enter()
      .append("path").attr('clip-path', 'url(#clip)')
      .attr("class", function(d){ return "movMyLines "+d.name })
      .merge(u)
 .transition()
 .duration(1000)
        .attr("d", line.curve(curveNMoveAge.N(7)))
        //.attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke-width", 2)
        .style("fill", "none")

        var line2 = d3.line()
          .x(function(d) { return x(parseTime(d.time)); })
          .y(function(d) { return z(+d.value) })

          var u = svg.selectAll(".myLines2")
      .data(dataReady2);

          u
            .enter()
            .append("path").attr('clip-path', 'url(#clip)')
            .attr("class", function(d){ return "myLines2 "+d.name })
            .merge(u)
       .transition()
       .duration(1000)
            .attr("d", function(d){ return line2(d.values) } )
            .attr("stroke", function(d){ return myColor(d.name) })
            .style("stroke-width", 2)
            .style("fill", "none")

        var movLine2 = d3.line()
            .x(function(d) { return x(parseTime(d.time)); })
            .y(function(d) { return z(+d.value) })
            //.interpolate(movingAvg(7))
            var u = svg.selectAll(".movMyLines2")
        .data(dataReady2);

            u
              .enter()
              .append("path").attr('clip-path', 'url(#clip)')
              .attr("class", function(d){ return "movMyLines2 "+d.name })
              .merge(u)
         .transition()
         .duration(1000)

            .attr("d", line2.curve(curveNMoveAge.N(7)))
            .attr("d", function(d){ return line2(d.values) } )
            .attr("stroke", function(d){ return myColor(d.name) })
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width", 2)
            .style("fill", "none")

//Jetzt für Plus-Szeario
            var linePlus = d3.line()
              .x(function(d) { return x(parseTime(d.time)); })
              .y(function(d) { return y(+d.value) })

              var u = svg.selectAll(".myLinesPlus")
          .data(dataReadyPlus);

              u
                .enter()
                .append("path").attr('clip-path', 'url(#clip)')
                .attr("class", function(d){ return "myLinesPlus "+d.name })
                .merge(u)
           .transition()
           .duration(1000)

                .attr("d", function(d){ return linePlus(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
        //welches == "start" ? 0.0)
                //.append("svg:title")
                //  .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

                var movLinePlus = d3.line()
            .x(function(d) { return x(parseTime(d.time)); })
            .y(function(d) { return y(+d.value) })
            //.interpolate(movingAvg(7))

            var u = svg.selectAll(".movMyLinesPlus")
        .data(dataReadyPlus);

            u
              .enter()
              .append("path").attr('clip-path', 'url(#clip)')
              .attr("class", function(d){ return "movMyLinesPlus "+d.name })
              .merge(u)
         .transition()
         .duration(1000)

                .attr("d", linePlus.curve(curveNMoveAge.N(7)))
                //.attr("class", function(d){ return d.name })
                .attr("d", function(d){ return linePlus(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

                var line2Plus = d3.line()
                  .x(function(d) { return x(parseTime(d.time)); })
                  .y(function(d) { return z(+d.value) })

                  var u = svg.selectAll(".myLines2Plus")
              .data(dataReady2Plus);

                  u
                    .enter()
                    .append("path").attr('clip-path', 'url(#clip)')
                    .attr("class", function(d){ return "myLines2Plus "+d.name })
                    .merge(u)
               .transition()
               .duration(1000)


                  //.append("path").attr('clip-path', 'url(#clip)')
                    //.attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Plus(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})


                var movLine2Plus = d3.line()
                    .x(function(d) { return x(parseTime(d.time)); })
                    .y(function(d) { return z(+d.value) })
                    //.interpolate(movingAvg(7))

                    var u = svg.selectAll(".movMyLines2Plus")
                .data(dataReady2Plus);

                    u
                      .enter()
                      .append("path").attr('clip-path', 'url(#clip)')
                      .attr("class", function(d){ return "movMyLines2Plus "+d.name })
                      .merge(u)
                 .transition()
                 .duration(1000)

                    //.append("path").attr('clip-path', 'url(#clip)')
                    .attr("d", line2Plus.curve(curveNMoveAge.N(7)))
                    //.attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Plus(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

  //Jetzt für Opt-Szeario
              var lineOpt = d3.line()
                .x(function(d) { return x(parseTime(d.time)); })
                .y(function(d) { return y(+d.value) })

                var u = svg.selectAll(".myLinesOpt")
            .data(dataReadyOpt);

                u
                  .enter()
                  .append("path").attr('clip-path', 'url(#clip)')
                  .attr("class", function(d){ return "myLinesOpt "+d.name })
                  .merge(u)
             .transition()
             .duration(1000)

                  .attr("d", function(d){ return lineOpt(d.values) } )
                  .attr("stroke", function(d){ return myColor(d.name) })
                  .style("stroke-width", 2)
                  .style("fill", "none")
                  .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
          //welches == "start" ? 0.0)
                  //.append("svg:title")
                  //  .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

                  var movLineOpt = d3.line()
              .x(function(d) { return x(parseTime(d.time)); })
              .y(function(d) { return y(+d.value) })
              //.interpolate(movingAvg(7))

              var u = svg.selectAll(".movMyLinesOpt")
          .data(dataReadyOpt);

              u
                .enter()
                .append("path").attr('clip-path', 'url(#clip)')
                .attr("class", function(d){ return "movMyLinesOpt "+d.name })
                .merge(u)
           .transition()
           .duration(1000)

                  .attr("d", lineOpt.curve(curveNMoveAge.N(7)))
                  //.attr("class", function(d){ return d.name })
                  .attr("d", function(d){ return lineOpt(d.values) } )
                  .attr("stroke", function(d){ return myColor(d.name) })
                  .style("stroke-dasharray", ("3, 3"))
                  .style("stroke-width", 2)
                  .style("fill", "none")
                  .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

                  var line2Opt = d3.line()
                    .x(function(d) { return x(parseTime(d.time)); })
                    .y(function(d) { return z(+d.value) })

                    var u = svg.selectAll(".myLines2Opt")
                .data(dataReady2Opt);

                    u
                      .enter()
                      .append("path").attr('clip-path', 'url(#clip)')
                      .attr("class", function(d){ return "myLines2Opt "+d.name })
                      .merge(u)
                 .transition()
                 .duration(1000)


                    //.append("path").attr('clip-path', 'url(#clip)')
                      //.attr("class", function(d){ return d.name })
                      .attr("d", function(d){ return line2Opt(d.values) } )
                      .attr("stroke", function(d){ return myColor(d.name) })
                      .style("stroke-width", 2)
                      .style("fill", "none")
                      .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})


                  var movLine2Opt = d3.line()
                      .x(function(d) { return x(parseTime(d.time)); })
                      .y(function(d) { return z(+d.value) })
                      //.interpolate(movingAvg(7))

                      var u = svg.selectAll(".movMyLines2Opt")
                  .data(dataReady2Opt);

                      u
                        .enter()
                        .append("path").attr('clip-path', 'url(#clip)')
                        .attr("class", function(d){ return "movMyLines2Opt "+d.name })
                        .merge(u)
                   .transition()
                   .duration(1000)

                      //.append("path").attr('clip-path', 'url(#clip)')
                      .attr("d", line2Opt.curve(curveNMoveAge.N(7)))
                      //.attr("class", function(d){ return d.name })
                      .attr("d", function(d){ return line2Opt(d.values) } )
                      .attr("stroke", function(d){ return myColor(d.name) })
                      .style("stroke-dasharray", ("3, 3"))
                      .style("stroke-width", 2)
                      .style("fill", "none")
                      .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

//Jetzt für Pess-Szeario
            var linePess = d3.line()
              .x(function(d) { return x(parseTime(d.time)); })
              .y(function(d) { return y(+d.value) })

              var u = svg.selectAll(".myLinesPess")
          .data(dataReadyPess);

              u
                .enter()
                .append("path").attr('clip-path', 'url(#clip)')
                .attr("class", function(d){ return "myLinesPess "+d.name })
                .merge(u)
           .transition()
           .duration(1000)

                .attr("d", function(d){ return linePess(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
        //welches == "start" ? 0.0)
                //.append("svg:title")
                //  .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

                var movLinePess = d3.line()
            .x(function(d) { return x(parseTime(d.time)); })
            .y(function(d) { return y(+d.value) })
            //.interpolate(movingAvg(7))

            var u = svg.selectAll(".movMyLinesPess")
        .data(dataReadyPess);

            u
              .enter()
              .append("path").attr('clip-path', 'url(#clip)')
              .attr("class", function(d){ return "movMyLinesPess "+d.name })
              .merge(u)
         .transition()
         .duration(1000)

                .attr("d", linePess.curve(curveNMoveAge.N(7)))
                //.attr("class", function(d){ return d.name })
                .attr("d", function(d){ return linePess(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

                var line2Pess = d3.line()
                  .x(function(d) { return x(parseTime(d.time)); })
                  .y(function(d) { return z(+d.value) })

                  var u = svg.selectAll(".myLines2Pess")
              .data(dataReady2Pess);

                  u
                    .enter()
                    .append("path").attr('clip-path', 'url(#clip)')
                    .attr("class", function(d){ return "myLines2Pess "+d.name })
                    .merge(u)
               .transition()
               .duration(1000)


                  //.append("path").attr('clip-path', 'url(#clip)')
                    //.attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Pess(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})


                var movLine2Pess = d3.line()
                    .x(function(d) { return x(parseTime(d.time)); })
                    .y(function(d) { return z(+d.value) })
                    //.interpolate(movingAvg(7))

                    var u = svg.selectAll(".movMyLines2Pess")
                .data(dataReady2Pess);

                    u
                      .enter()
                      .append("path").attr('clip-path', 'url(#clip)')
                      .attr("class", function(d){ return "movMyLines2Pess "+d.name })
                      .merge(u)
                 .transition()
                 .duration(1000)

                    //.append("path").attr('clip-path', 'url(#clip)')
                    .attr("d", line2Pess.curve(curveNMoveAge.N(7)))
                    //.attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Pess(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})

/*
    // Add a label at the end of each line
    var u = svg.selectAll(".myLabels")
.data(dataReady);
    u
      .enter()

        .append('g')
        .append("text")
          .attr("class", function(d){ return "myLabels "+d.name })
          .merge(u)
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
          var u = svg.selectAll(".myLabels2")
          .data(dataReady2);
          u
            .enter()
              .append('g')
              .append("text")
                .attr("class", function(d){ return "myLabels2 "+d.name })
                .merge(u)
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + z(d.value.value) + ")"; }) // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(function(d) { return d.name; })
            .style("fill", function(d){ return myColor(d.name) })
            .style("font-size", 15)
            var u = svg.selectAll(".myLabelsPlus")
            .data(dataReadyPlus);
            u
              .enter()
                .append('g')
                .append("text")
                  .attr("class", function(d){ return "myLabelsPlus "+d.name })
                  .merge(u)
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(function(d) { return d.name; })
            .style("fill", function(d){ return myColor(d.name) })
            .style("font-size", 15)
            .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
            var u = svg.selectAll(".myLabelsPlus2")
        .data(dataReady2Plus);
            u
              .enter()
                .append('g')
                .append("text")
                  .attr("class", function(d){ return "myLabelsPlus2 "+d.name })
                  .merge(u)
              .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
              .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + z(d.value.value) + ")"; }) // Put the text at the position of the last point
              .attr("x", 12) // shift the text a bit more right
              .text(function(d) { return d.name; })
              .style("fill", function(d){ return myColor(d.name) })
              .style("font-size", 15)
              .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
              var u = svg.selectAll(".myLabelsOpt")
              .data(dataReadyOpt);
              u
                .enter()
                  .append('g')
                  .append("text")
                    .attr("class", function(d){ return "myLabelsOpt "+d.name })
                    .merge(u)
              .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
              .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
              .attr("x", 12) // shift the text a bit more right
              .text(function(d) { return d.name; })
              .style("fill", function(d){ return myColor(d.name) })
              .style("font-size", 15)
              .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
              var u = svg.selectAll(".myLabelsOpt2")
              .data(dataReady2Opt);
              u
                .enter()
                  .append('g')
                  .append("text")
                    .attr("class", function(d){ return "myLabelsOpt2 "+d.name })
                    .merge(u)
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
                .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + z(d.value.value) + ")"; }) // Put the text at the position of the last point
                .attr("x", 12) // shift the text a bit more right
                .text(function(d) { return d.name; })
                .style("fill", function(d){ return myColor(d.name) })
                .style("font-size", 15)
                .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
                var u = svg.selectAll(".myLabelsPess")
            .data(dataReadyPess);
                u
                  .enter()
                    .append('g')
                    .append("text")
                      .attr("class", function(d){ return "myLabelsPess "+d.name })
                      .merge(u)
                      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
                      .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
                      .attr("x", 12) // shift the text a bit more right
                      .text(function(d) { return d.name; })
                      .style("fill", function(d){ return myColor(d.name) })
                      .style("font-size", 15)
                      .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
                      var u = svg.selectAll(".myLabels2Pess")
                  .data(dataReady2Pess);
                      u
                        .enter()
                          .append('g')
                          .append("text")
                            .attr("class", function(d){ return "myLabels2Pess "+d.name })
                            .merge(u)
                        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
                        .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + z(d.value.value) + ")"; }) // Put the text at the position of the last point
                        .attr("x", 12) // shift the text a bit more right
                        .text(function(d) { return d.name; })
                        .style("fill", function(d){ return myColor(d.name) })
                        .style("font-size", 15)
                        .style('opacity', function(d) {currentOpacity = d3.selectAll("." + d.name).style("opacity");if (welches == "start") {return 0.0} else{return currentOpacity};})
*/
var u = svg.selectAll(".lastupdate")
.data(dataReady);

//svg.append("line")
u
.enter()

//.append("path").attr('clip-path', 'url(#clip)')
.append("g")

.append("line")
.attr('clip-path', 'url(#clip)')

.attr("class","lastupdate")
.merge(u)
.transition()
.duration(1000)
.attr("x1", x(parseTime(lastupdatestring)))  //<<== change your code here
.attr("y1", 0)
.attr("x2", x(parseTime(lastupdatestring)))  //<<== and here
.attr("y2", height)
.style("stroke-width", 1)
.style("stroke-dasharray", ("3, 3"))
.style("stroke", "black")
.style("fill", "none");
var u = svg.selectAll(".lastupdatetext")
.data(dataReady);

u
.enter()

.append("g")

    .append("text")
    .attr('clip-path', 'url(#clip)')

    .attr("font-size", 12)
    .attr("class","lastupdatetext")
    .merge(u)
    .transition()
    .duration(1000)
      .attr('y', 30)
      .attr('x', x(parseTime(lastupdatestring))-142)
      .text('Last Update: '+ lastupdatestring)
      .style("fill", "black")


    //   var g = svg.append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    //   var focus = g.append("g")
    //           .attr("class", "focus")
    //           .style("display", "none");
    //
    //       focus.append("line")
    //           .attr("class", "x-hover-line hover-line")
    //           .attr("y1", 0)
    //           .attr("y2", height);
    //
    //       focus.append("line")
    //           .attr("class", "y-hover-line hover-line")
    //           .attr("x1", width)
    //           .attr("x2", width);
    //
    //       focus.append("circle")
    //           .attr("r", 7.5);
    //
    //       focus.append("text")
    //           .attr("x", 15)
    //         	.attr("dy", ".31em");
    //
    //       svg.append("rect")
    //           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //           .attr("class", "overlay")
    //           .attr("width", width)
    //           .attr("height", height)
    //           .on("mouseover", function() { focus.style("display", null); })
    //           .on("mouseout", function() { focus.style("display", "none"); })
    //           .on("mousemove", mousemove);

 //              var  bisectDate = d3.bisector(function(d) { return parseTime(d.Datum); }).left;
 //
 //
 //
 //          var focus = svg.append("g")
 //            .attr("class", "focus")
 //
 //        focus.append("circle")
 //            .attr("r", 5);
 //
 //            focus.append("rect")
 //                .attr("class", "tooltiphere")
 //                .attr("width", 100)
 //                .attr("height", 50)
 //                .attr("x", 10)
 //                .attr("y", -22)
 //                .attr("rx", 4)
 //                .attr("ry", 4)
 //
 //                .style("stroke","black");
 //
 //        focus.append("text")
 //            .attr("class", "tooltip-date")
 //            .attr("x", 18)
 //            .attr("y", -2);
 //
 //        focus.append("text")
 //            .attr("x", 18)
 //            .attr("y", 18)
 //            .text("");
 //
 //        focus.append("text")
 //            .attr("class", "tooltip-likes")
 //            .attr("x", 60)
 //            .attr("y", 18);
 //
 //        svg.append("rect")
 //            .attr("class", "overlay")
 //            .attr("width", width)
 //            .attr("height", height)
 //            .on("mouseover", function() { focus.style("display", null); })
 //            .on("mouseout", function() { focus.style("display", "none"); })
 //            .on("mousemove", mousemove);
 //
 // var formatValue = d3.format(",");
 //
 //        function mousemove() {
 //            var x0 = x.invert(d3.mouse(this)[0]),
 //                i = bisectDate(data, x0, 1),
 //                d0 = data[i - 1],
 //                d1 = data[i],
 //                d = x0 - d0.Datum > d1.Datum - x0 ? d1 : d0;
 //                console.log(document.getElementById("tooltip1").value);
 //            focus.attr("transform", "translate(" + x(parseTime(d.Datum)) + "," + y(d[document.getElementById("tooltip1").value]) + ")");
 //            focus.select(".tooltip-date").text(d.Datum);
 //            focus.select(".tooltip-likes").text(formatValue(Math.round(d[document.getElementById("tooltip1").value])));
 //
 //        }




    }//end of update function
    update(-1,"start");

    // Add a legend (interactive)
    svg
      .selectAll("myLegend")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr('y', height+50)
          .attr('x', 200)
          .text(function(d) { return "\uf14a "+ d.name + " (Linke y-Achse)"; })
          .attr("class", "fa")
          .attr("class","fas fa-adjust")
          //.text("\uf005")
          //.text(function (d) { return '\uf2b9' })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

        .on("click", function(d){
          // is the element currently visible ?
          currentOpacity = d3.selectAll("." + d.name).style("opacity")
          // Change the opacity: from 0 to 1 or from 1 to 0
          d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
          d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Linke y-Achse)":"\uf14a "+ d.name + " (Linke y-Achse)");
        })
    svg
      .selectAll("myLegend2")
      .data(dataReady2)
      .enter()
        .append('g')
        .append("text")
          .attr('y', height+50)
          .attr('x', 600)
          .text(function(d) { return "\uf14a"+ d.name + " (Rechte y-Achse)"; })
          .attr("class", "fa")
          .attr("class","fas fa-adjust")
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
        .on("click", function(d){
          // is the element currently visible ?
          currentOpacity = d3.selectAll("." + d.name).style("opacity")
          // Change the opacity: from 0 to 1 or from 1 to 0
          d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
          d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Rechte y-Achse)":"\uf14a "+ d.name + " (Rechte y-Achse)");
        })

        svg
          .selectAll("myLegendPlus")
          .data(dataReadyPlus)
          .enter()
            .append('g')
            .append("text")
              .attr('y', height+50+20)
              .attr('x', 200)
              .text(function(d) { return "\uf0c8 "+ d.name + " (Linke y-Achse)"; })
              .attr("class", "fa")
              .attr("class","fas fa-adjust")
              //.text("\uf005")
              //.text(function (d) { return '\uf2b9' })
              .style("fill", function(d){ return myColor(d.name) })
              .style("font-size", 15)

            .on("click", function(d){
              // is the element currently visible ?
              currentOpacity = d3.selectAll("." + d.name).style("opacity")
              // Change the opacity: from 0 to 1 or from 1 to 0
              d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
              d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Linke y-Achse)":"\uf14a "+ d.name + " (Linke y-Achse)");
            })
        svg
          .selectAll("myLegend2Plus")
          .data(dataReady2Plus)
          .enter()
            .append('g')
            .append("text")
              .attr('y', height+50+20)
              .attr('x', 600)
              .text(function(d) { return "\uf0c8"+ d.name + " (Rechte y-Achse)"; })
              .attr("class", "fa")
              .attr("class","fas fa-adjust")
              .style("fill", function(d){ return myColor(d.name) })
              .style("font-size", 15)
            .on("click", function(d){
              // is the element currently visible ?
              currentOpacity = d3.selectAll("." + d.name).style("opacity")
              // Change the opacity: from 0 to 1 or from 1 to 0
              d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
              d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Rechte y-Achse)":"\uf14a "+ d.name + " (Rechte y-Achse)");
            })
            svg
              .selectAll("myLegendOpt")
              .data(dataReadyOpt)
              .enter()
                .append('g')
                .append("text")
                  .attr('y', height+50+40)
                  .attr('x', 200)
                  .text(function(d) { return "\uf0c8 "+ d.name + " (Linke y-Achse)"; })
                  .attr("class", "fa")
                  .attr("class","fas fa-adjust")
                  //.text("\uf005")
                  //.text(function (d) { return '\uf2b9' })
                  .style("fill", function(d){ return myColor(d.name) })
                  .style("font-size", 15)

                .on("click", function(d){
                  // is the element currently visible ?
                  currentOpacity = d3.selectAll("." + d.name).style("opacity")
                  // Change the opacity: from 0 to 1 or from 1 to 0
                  d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
                  d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Linke y-Achse)":"\uf14a "+ d.name + " (Linke y-Achse)");
                })
            svg
              .selectAll("myLegend2Opt")
              .data(dataReady2Opt)
              .enter()
                .append('g')
                .append("text")
                  .attr('y', height+50+40)
                  .attr('x', 600)
                  .text(function(d) { return "\uf0c8"+ d.name + " (Rechte y-Achse)"; })
                  .attr("class", "fa")
                  .attr("class","fas fa-adjust")
                  .style("fill", function(d){ return myColor(d.name) })
                  .style("font-size", 15)
                .on("click", function(d){
                  // is the element currently visible ?
                  currentOpacity = d3.selectAll("." + d.name).style("opacity")
                  // Change the opacity: from 0 to 1 or from 1 to 0
                  d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
                  d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Rechte y-Achse)":"\uf14a "+ d.name + " (Rechte y-Achse)");
                })
                svg
                  .selectAll("myLegendPess")
                  .data(dataReadyPess)
                  .enter()
                    .append('g')
                    .append("text")
                      .attr('y', height+50+60)
                      .attr('x', 200)
                      .text(function(d) { return "\uf0c8 "+ d.name + " (Linke y-Achse)"; })
                      .attr("class", "fa")
                      .attr("class","fas fa-adjust")
                      //.text("\uf005")
                      //.text(function (d) { return '\uf2b9' })
                      .style("fill", function(d){ return myColor(d.name) })
                      .style("font-size", 15)

                    .on("click", function(d){
                      // is the element currently visible ?
                      currentOpacity = d3.selectAll("." + d.name).style("opacity")
                      // Change the opacity: from 0 to 1 or from 1 to 0
                      d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
                      d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Linke y-Achse)":"\uf14a "+ d.name + " (Linke y-Achse)");
                    })
                svg
                  .selectAll("myLegend2Pess")
                  .data(dataReady2Pess)
                  .enter()
                    .append('g')
                    .append("text")
                      .attr('y', height+50+60)
                      .attr('x', 600)
                      .text(function(d) { return "\uf0c8"+ d.name + " (Rechte y-Achse)"; })
                      .attr("class", "fa")
                      .attr("class","fas fa-adjust")
                      .style("fill", function(d){ return myColor(d.name) })
                      .style("font-size", 15)
                    .on("click", function(d){
                      // is the element currently visible ?
                      currentOpacity = d3.selectAll("." + d.name).style("opacity")
                      // Change the opacity: from 0 to 1 or from 1 to 0
                      d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
                      d3.select(this).text(currentOpacity == 1 ? "\uf0c8 "+ d.name + " (Rechte y-Achse)":"\uf14a "+ d.name + " (Rechte y-Achse)");
                    })

    svg
    .selectAll("LegendTitle").data(dataReady).enter().append('g').append("text")
    .attr('x', 0)
    .attr('y', height+50)
    .text('Szenario Basis')
    .style("fill", "black")
    .style("font-size", 15)
    svg
    .selectAll("LegendTitlePlus").data(dataReadyPlus).enter().append('g').append("text")
    .attr('x', 0)
    .attr('y', height+50+20)
    .text('Szenario Basis-Plus')
    .style("fill", "black")
    .style("font-size", 15)
    svg
    .selectAll("LegendTitleOpt").data(dataReadyOpt).enter().append('g').append("text")
    .attr('x', 0)
    .attr('y', height+50+40)
    .text('Szenario Optimistisch')
    .style("fill", "black")
    .style("font-size", 15)
    svg
    .selectAll("LegendTitlePess").data(dataReadyPess).enter().append('g').append("text")
    .attr('x', 0)
    .attr('y', height+50+60)
    .text('Szenario Pessimistisch')
    .style("fill", "black")
    .style("font-size", 15)



// when the input range changes update value
d3.select("#lyachse1").on("input", function() {
  update(+this.value,"lyachse");
});
d3.select("#ryachse1").on("input", function() {
  update(+this.value,"ryachse");
});
d3.select("#xachsestart1").on("input", function() {
  update(+this.value,"xachsestart");
});
d3.select("#xachseende1").on("input", function() {
  update(+this.value,"xachseende");
});

// update the elements


 //        d3.select(".yaxis").transition().duration(1000).call(d3.axisLeft(y));
 //
 //          var line = d3.line()
 //            .x(function(d) { return x(parseTime(d.time)); })
 //            .y(function(d) { return y(+d.value) });
 //
 //
 //            var u = svg.selectAll(".myLines")
 //            .data(dataReady)
 //
 //          u
 //            .enter()
 //            .append("path").attr('clip-path', 'url(#clip)')
 //            .attr("class", "myLines")
 //
 //            .merge(u)
 // .transition()
 // .duration(1000)
 //
 //              .attr("d", function(d){ return line(d.values) } )
 //              .attr("stroke", function(d){ return myColor(d.name) })
 //              .style("stroke-width", 2)
 //              .style("fill", "none")





})

});
