class LineChart {

    constructor(chartID, valueName, chartTitle) {
      let chart = this.createChart(chartID);
      this.createDateAxis(chart);
      this.createValueAxis(chart);
      chart.cursor = this.createCursor();
      this.createSeries(chart, valueName);
      this.createChartTitle(chart, chartTitle);
      this.chart = chart;
    }
  
    createChart(chartID) {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_dark);
      // Themes end
  
      // Create chart instance
      return am4core.create(chartID, am4charts.XYChart);
    }

    createDateAxis(chart) {
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        "timeUnit": "second",
        "count": 1
      };
      dateAxis.renderer.labels.template.fill = am4core.color("white");
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.cursorTooltipEnabled = false;
    }

    createValueAxis(chart) {
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = am4core.color("white");
      valueAxis.renderer.grid.template.disabled = true;
  
      // Hide cursor labels
      valueAxis.cursorTooltipEnabled = false;
    }

    createCursor() {
      //cursor (is needed to be able to display a tooltip, will not work without)
      let cursor = new am4charts.XYCursor();
      cursor.xAxis = this.dateAxis;
      cursor.fullWidthLineX = true;
      cursor.lineX.strokeWidth = 1;
      cursor.lineY.strokeWidth = 1;
      cursor.lineX.fill = am4core.color("#8F3985");
      cursor.lineX.fillOpacity = 0.1;
      cursor.lineX.disabled = true;
      cursor.lineY.disabled = true;
      return cursor;
    }

    createSeries(chart, valueName) {
      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.tensionX = 0.8;
      series.strokeWidth = 3;
      series.fillOpacity = 0.2;
      series.fill = am4core.color("white");
      series.segments.template.fillModifier = this.createFillModifier();
      series.stroke = am4core.color("white");
      series.dataFields.valueY = valueName; 
      series.dataFields.dateX = "date";
      // this.series.name = this.chartID;
      series.tooltipText = "[bold]{valueY}[/]";
    }

    createFillModifier() {
      // Create linear gradient
      let fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 0];
      fillModifier.offsets = [0, 1];
      fillModifier.gradient.rotation = 90;
      return fillModifier;
    }

    createChartTitle(chart, chartTitle) {
      var title = chart.titles.create();
      title.text = chartTitle;
      title.fontSize = 25;
      title.marginBottom = 30;
    }

    loadData(data) {
      // Fill chart data
      this.chart.data = data;
    }
  }