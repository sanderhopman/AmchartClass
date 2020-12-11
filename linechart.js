class LineChart {

    constructor(chartName) {
      this.chartName = chartName;
      this.createChart();
      this.createAxis();
      this.createCursor();
      this.createFillModifier();
      this.createSeries();
    }
  
    createChart() {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
  
      // Create chart instance
      this.chart = am4core.create(this.chartName, am4charts.XYChart);
    }

    createAxis() {
      // Create axes
      this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      this.dateAxis.baseInterval = {
        "timeUnit": "second",
        "count": 1
      };
      this.dateAxis.renderer.labels.template.fill = am4core.color("white");
      
      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.valueAxis.renderer.labels.template.fill = am4core.color("white");
      this.dateAxis.renderer.grid.template.disabled = true;
      this.valueAxis.renderer.grid.template.disabled = true;
  
      // Hide cursor labels
      this.valueAxis.cursorTooltipEnabled = false;
      this.dateAxis.cursorTooltipEnabled = false;
    }

    createCursor() {
      //cursor (is needed to be able to display a tooltip, will not work without)
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.xAxis = this.dateAxis;
      this.chart.cursor.fullWidthLineX = true;
      this.chart.cursor.lineX.strokeWidth = 1;
      this.chart.cursor.lineY.strokeWidth = 1;
      this.chart.cursor.lineX.fill = am4core.color("#8F3985");
      this.chart.cursor.lineX.fillOpacity = 0.1;
      this.chart.cursor.lineX.disabled = true;
      this.chart.cursor.lineY.disabled = true;
    }

    createFillModifier() {
      // Create linear gradient
      this.fillModifier = new am4core.LinearGradientModifier();
      this.fillModifier.opacities = [1, 0];
      this.fillModifier.offsets = [0, 1];
      this.fillModifier.gradient.rotation = 90;
    }

    createSeries() {
      // Create series
      this.series = this.chart.series.push(new am4charts.LineSeries());
      this.series.tensionX = 0.8;
      this.series.strokeWidth = 3;
      this.series.fillOpacity = 0.2;
      this.series.fill = am4core.color("white");
      this.series.segments.template.fillModifier = this.fillModifier;
      this.series.stroke = am4core.color("white");
      this.series.dataFields.valueY = "t_value"; 
      this.series.dataFields.dateX = "date";
      this.series.name = this.chartName;
      this.series.tooltipText = "[bold]{t_value}[/]";
    }

    loadData(data) {
      // Fill chart data
      this.chart.data = data;
    }
  }