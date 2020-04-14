// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");

var series_1_channel_id = 1021057; //channel number
var series_1_field_number = 1; //data field
var series_2_field_number = 2;
var series_3_field_number = 3;
var series_1_read_api_key = 'UBED30T38B8CSCOF'; // read api_key
var series_1_results = 432; // data number
var series_1_color = '#ff0000';

addSeries(series_1_channel_id, series_1_field_number, series_1_read_api_key, series_1_results, series_1_color);
//데이터 파싱 부분
function addSeries(channel_id, field_number, api_key, results, color) {
  var field_name = 'field' + field_number;

  // get the data with a webservice call
  $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number + '.json?offset=0&round=2&results=' + results + '&api_key=' + api_key, function (data) {

      // blank array for holding chart data
      var chart_data = [];
      console.log(chart_data);
      // iterate through each feed
      $.each(data.feeds, function () {
      //     var point = new Highcharts.Point();
      //     // set the proper values
          var value = this[field_name];
      //     point.x = getChartDate(this.created_at);
      //     point.y = parseFloat(value);
      //     // add location if possible
      //     if (this.location) { point.name = this.location; }
      //     // if a numerical value exists add it
          if (!isNaN(parseInt(value))) { chart_data.push(point); }
      });

      // // add the chart data
      // if (field_number == 4)
      //     my_chart.addSeries({ data: chart_data, name: data.channel[field_name], color: color, yAxis: 1 });
      // else
      //     my_chart.addSeries({ data: chart_data, name: data.channel[field_name], color: color, yAxis: 0 });
  });
}



var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    datasets: [{
      label: "누적 운송시간:",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,

      data: [5000, 10000, 5000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 25000, 30000],
      // data:[1,2,3,4,5,6,7,8,9,10,11,12,13]
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return number_format(value / 1000 * 2) + "°C"; //y축 표시
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          // var t = chart.datasets[tooltipItem.datasetIndex].data2[tooltipItem.datasetIndex];
          // console.log(chart.data[1]);
          return datasetLabel + number_format(tooltipItem.Label);
          // return datasetLabel  +t;

        }
      }
    }
  }
});



