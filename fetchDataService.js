// Fetch Sensordata Service
let testdata = [
    {
        date: new Date(2020, 10, 1),
        t_value: 30
    },
    {
        date: new Date(2020, 10, 14),
        t_value: 50
    },
    {
        date: new Date(2020, 10, 28),
        t_value: 65
    }
  ];

let insideTempChart = new LineChart('insideTempChart');
insideTempChart.loadData(testdata);
let outsideTempChart = new LineChart('outsideTempChart');


const baseURL = config.CLOUDSTATION_PROJECT_URL;

(function fetchSensorData() {
    // Fetch and prepare data -------------------------------------
    fetchChartDataFromDB(baseURL, 180).then(data => {
        outsideTempChart.loadData(data); // The dates have to be reversed to be able to scroll the graph (.reverse() )
    })
})();

// Fetch couchDB data --------------------------------------------
async function fetchChartDataFromDB(destination, limitTo) {
    const response = await fetch(destination + "&limit=" + String(limitTo))
    const data= await response.json()
    console.log("data.rows", data.rows)
    let convertedData = convertDateAndFillDataArray(data.rows)
    console.log("Converted data: ", convertedData)
    return convertedData
}

// Convert data rows to arry of maps??, timestamp and temp value only --------------------------------------------
function convertDateAndFillDataArray(data) {
    let result = [];
    for(i in data) {
        if (i % 12 == 0){
            let date = new Date(data[i].key);
            //Push the climatesensor data: Temperature, humidity and pressure
            result.push({
                date:date,
                t_value: data[i].value.temperature,
                h_value: data[i].value.humidity,
                p_value: data[i].value.pressure
            });
        }
    }
    console.log("convert result: ", result);
    return result
}