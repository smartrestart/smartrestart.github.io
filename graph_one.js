


// set the dimensions and margins of the graph
var margin = {top: 50, right: 150, bottom: 110, left: 50},
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

//Read the data
d3.csv("https://raw.githubusercontent.com/smartrestart/smartrestart.github.io/master/output/data.csv", function(data) {
    // List of groups (here I have one group per column)
    var allGroup = ["Viral_Pot", "Free_Viral"];
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
        var allGroupPlus = ["Viral_Pot_Plus", "Free_Viral_Plus"];
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


    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    //var x = d3.scaleLinear()
    //  .domain([0,10])
    //  .range([ 0, width ]);
    var x = d3.scaleTime()
  .rangeRound([0, width]);

  var x_axis = d3.axisBottom(x);

  var xFormat = "%d-%b-%Y";;
  var parseTime = d3.timeParse("%Y-%m-%d");
  x.domain(d3.extent(data, function(d) { return parseTime(d.Datum); }));
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
  //  .call(d3.axisBottom(x));
  .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)).ticks(d3.timeFormat.month, 2)) ;



    // Add Y axis
    var y = d3.scaleLinear()
      //.domain( [0,20000])
      .range([ height, 0 ]);





      var z = d3.scaleLinear()
        .domain( [0,1])
        .range([ height, 0 ]);
      svg.append("g")
      .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(z));


        var z_axis = d3.axisBottom(z);




      	y.domain([0,
                  d3.max([d3.max(data, function(d) { return +d.Viral_Pot; }),d3.max(data, function(d) { return +d.Free_Viral; })])]);
                    //allGroup.map( function(d) {
                    //console.log(d3.max(d.value.values));
                    //return d3.max(d.value.values);
                  //}))]);
                  svg.append("g")
                    .call(d3.axisLeft(y));

                  var y_axis = d3.axisBottom(y);




    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(parseTime(d.time)); })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 2)
        .style("fill", "none")
        //.append("svg:title")
        //  .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

        var movLine = d3.line()
    .x(function(d) { return x(parseTime(d.time)); })
    .y(function(d) { return y(+d.value) })
    //.interpolate(movingAvg(7))
    svg.selectAll("movMyLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", line.curve(curveNMoveAge.N(7)))
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke-width", 2)
        .style("fill", "none")

        var line2 = d3.line()
          .x(function(d) { return x(parseTime(d.time)); })
          .y(function(d) { return z(+d.value) })
        svg.selectAll("myLines2")
          .data(dataReady2)
          .enter()
          .append("path")
            .attr("class", function(d){ return d.name })
            .attr("d", function(d){ return line2(d.values) } )
            .attr("stroke", function(d){ return myColor(d.name) })
            .style("stroke-width", 2)
            .style("fill", "none")

        var movLine2 = d3.line()
            .x(function(d) { return x(parseTime(d.time)); })
            .y(function(d) { return z(+d.value) })
            //.interpolate(movingAvg(7))
            svg.selectAll("movMyLines2")
            .data(dataReady2)
            .enter()
            .append("path")
            .attr("d", line2.curve(curveNMoveAge.N(7)))
            .attr("class", function(d){ return d.name })
            .attr("d", function(d){ return line2(d.values) } )
            .attr("stroke", function(d){ return myColor(d.name) })
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width", 2)
            .style("fill", "none")

//Jetzt für Plus-Szeario
            var linePlus = d3.line()
              .x(function(d) { return x(parseTime(d.time)); })
              .y(function(d) { return y(+d.value) })
            svg.selectAll("myLinesPlus")
              .data(dataReadyPlus)
              .enter()
              .append("path")
                .attr("class", function(d){ return d.name })
                .attr("d", function(d){ return linePlus(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', 0.0)
                //.append("svg:title")
                //  .text(function(d,i) { return "Datum " + parseTime(i.time) + " Wert: " + i.value; });

                var movLinePlus = d3.line()
            .x(function(d) { return x(parseTime(d.time)); })
            .y(function(d) { return y(+d.value) })
            //.interpolate(movingAvg(7))
            svg.selectAll("movMyLinesPlus")
              .data(dataReadyPlus)
              .enter()
              .append("path")
                .attr("d", linePlus.curve(curveNMoveAge.N(7)))
                .attr("class", function(d){ return d.name })
                .attr("d", function(d){ return linePlus(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke-width", 2)
                .style("fill", "none")
                .style('opacity', 0.0)

                var line2Plus = d3.line()
                  .x(function(d) { return x(parseTime(d.time)); })
                  .y(function(d) { return z(+d.value) })


                svg.selectAll("myLines2Plus")
                  .data(dataReady2Plus)
                  .enter()
                  .append("path")
                    .attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Plus(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', 0.0)


                var movLine2Plus = d3.line()
                    .x(function(d) { return x(parseTime(d.time)); })
                    .y(function(d) { return z(+d.value) })
                    //.interpolate(movingAvg(7))
                    svg.selectAll("movMyLines2Plus")
                    .data(dataReady2Plus)
                    .enter()
                    .append("path")
                    .attr("d", line2Plus.curve(curveNMoveAge.N(7)))
                    .attr("class", function(d){ return d.name })
                    .attr("d", function(d){ return line2Plus(d.values) } )
                    .attr("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-width", 2)
                    .style("fill", "none")
                    .style('opacity', 0.0)

    // Add the points
    /*
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        .attr("class", function(d){ return d.name })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(parseTime(d.time)) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 3)
        .attr("stroke", "white")
        //.append("svg:title")
        //  .text(function(d, i) { return "Datum " + d.time + " Wert: " + d.value; });
        */

    // Add a label at the end of each line
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr("class", function(d){ return d.name })
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
      svg
        .selectAll("myLabels2")
        .data(dataReady2)
        .enter()
          .append('g')
          .append("text")
            .attr("class", function(d){ return d.name })
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.time)) + "," + z(d.value.value) + ")"; }) // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(function(d) { return d.name; })
            .style("fill", function(d){ return myColor(d.name) })
            .style("font-size", 15)

    // Add a legend (interactive)
    svg
      .selectAll("myLegend")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr('y', function(d,i){ return height+50 + (i+1)*20})
          .attr('x', 30)
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
          .attr('y', height+50+3*20)
          .attr('x', 30)
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
              .attr('y', function(d,i){ return height+50 + (i+1)*20})
              .attr('x', 600)
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
              .attr('y', height+50+3*20)
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
    .attr('x', 30)
    .attr('y', height+50)
    .text('Scenario Base5')
    .style("fill", "black")
    .style("font-size", 15)

    svg
    .selectAll("LegendTitlePlus").data(dataReadyPlus).enter().append('g').append("text")
    .attr('x', 600)
    .attr('y', height+50)
    .text('Scenario BasePlus5')
    .style("fill", "black")
    .style("font-size", 15)

})
