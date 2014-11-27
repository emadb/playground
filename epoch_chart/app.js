var myChart;

$(function() {
  var data = [
    { label: 'Layer 1', values: [ 
      {time: 1370044800, y: 0}, 
      {time: 1370044801, y: 3}, 
      {time: 1370044802, y: 2} ] 
    }
  ,
   { label: 'Layer 2', values: [ {x: 1370044800, y: 0}, {x: 1370044801, y: 1}, {x: 1370044802, y: 4} ] }
  ];

  var nextX = 1370044803;

  myChart = $('#myChart').epoch({ type: 'time.bar', data: data });
  // var myChart = $('#myChart').epoch({
  //     type: 'time.line',
  //     data: data,
  //     pixelRatio: 1
  // });

  $('#newPoint').click(function(){
    var p1 = {time: nextX, y: Math.floor(Math.random() * 6) + 1};
    var p2 = {time: nextX, y: Math.floor(Math.random() * 6) + 1};
    myChart.push([p1, p2]);
    nextX++;
    
  });
});