google.charts.load('current', {
  'packages':['geochart','corechart', 'table'],
  'mapsApiKey': 'AIzaSyAWyLSsjUXSHnhiskGupMURCA9SrxM-m-I'
});
google.charts.setOnLoadCallback(initCharts);

$(document).ready(function(){
  M.AutoInit();
  var currentWindowWidth = $('body')[0].offsetWidth;
  $(window).resize(function() {
    if($('body')[0].offsetWidth != currentWindowWidth){
      initCharts();
    }
  });
})
 


function initCharts(){
  drawRegionsMap();
  drawLineChart();
  drawDonutPies();
  drawTables();
}

function drawLineChart() {
  var data = google.visualization.arrayToDataTable(downloadsByMonth);
  var options = {
    legend: 'none',
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}


function drawRegionsMap() {
  var downloadsData = google.visualization.arrayToDataTable(downloadsByCountry);
  var options = {
    colorAxis: {colors: ['#7AA1D2', '#DBD4B4', '#CC95C0']},
    defaultColor: '#f5f5f5',
  };
  var downloadsChart = new google.visualization.GeoChart(document.getElementById('downloads'));
  downloadsChart.draw(downloadsData, options);
}

function drawDonutPies(){
  var options = {
    pieHole: 0.4,
    slices: {
      0: { color: '#7AA1D2' },
      1: { color: '#B0BDC1' },
      2: { color: '#D5B9BA' },
      3: { color: '#87A8CE' },
      4: { color: '#DAD3B4' },
      5: { color: '#CC96C0' },
      6: { color: '#9BB2C7' },
      7: { color: '#D8C7B6' },
      8: { color: '#CACBB9' },
      9: { color: '#D0A5BD' },
      10: { color: '#D5B9BA' }
    }
  };
  var downloadsCountryData = google.visualization.arrayToDataTable(topTenDownloadsByCountry);
  var downloadsCityData = google.visualization.arrayToDataTable(topTenDownloadsByCity);
  var downloadsCountryPie = new google.visualization.PieChart(document.getElementById('downloadsCountryDonutChart'));
  var downloadsCityPie = new google.visualization.PieChart(document.getElementById('downloadsCityDonutChart'));
  downloadsCountryPie.draw(downloadsCountryData, options);
  downloadsCityPie.draw(downloadsCityData, options);
}

function drawTables(){
  var downloadsByCountryData = google.visualization.arrayToDataTable(downloadsByCountryDataTable);
  var downloadsByCityData = google.visualization.arrayToDataTable(downloadsByCityDataTable);

  var tableCountry = new google.visualization.Table(document.getElementById('downloads-by-country-table'));
  var tableCity = new google.visualization.Table(document.getElementById('downloads-by-city-table'));

  tableCountry.draw(downloadsByCountryData, {showRowNumber: false, allowHtml: true, width: '100%', height: '100%'});
  tableCity.draw(downloadsByCityData, {showRowNumber: false, allowHtml: false, width: '100%', height: '100%'});
}