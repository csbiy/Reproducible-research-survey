function createGph(chartDto){
    Highcharts.chart('container', {
      chart: {
        polar: true,
        type: 'line'
      },
      title: {
        text: 'Evaluation Score',
        x: -80
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: ['실무자 의견반영', '빠른 보고서화', '데이터 정확도', '실무자 시간절약','만족도',
          '프로그램 지속 개선'],
        tickmarkPlacement: 'on',
        lineWidth: 1
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 1,
        min: 0,
        max: 5,
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
      },
    
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
      },
    
      series: [{
        name: 'Reproducible Research program score',
        data: chartDto,
        pointPlacement: 'on'
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            pane: {
              size: '70%'
            }
          }
        }]
      }
    
    });
    }