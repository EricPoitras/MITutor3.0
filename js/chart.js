var learningcurve_options = {
  chart: {
    height: 600,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  colors: ['#dc3545'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  series: [{
    name: "Reflection",
    data: [40, 35, 35, 25, 20, 10, 15, 20, 8, 40, 35, 35, 25, 20, 10, 15, 20, 8, 5, 0]
  }],
  title: {
    text: 'Error Rate By Knowledge Component for Reflection',
    align: 'left',
    style: {
      fontSize:  '18px',
    }
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    title: {
      text: 'Opportunity',
      style: {
        fontSize: '16px'
      }
    },
    labels: {
      style:{
          fontSize: '16px'
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    title: {
        text: 'Error Rate',
        style: {
          fontSize: '16px'
        }
    },
    labels: {
      style:{
          fontSize: '16px'
      }
    },
    min: 0,
    max: 50
  }
}

var chart = new ApexCharts(
  document.querySelector("#chart"),
  learningcurve_options
);





   
