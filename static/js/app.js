function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("./data/samples.json").then((data) =>{
        // console.log(data)


        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        getPlotID(data.names[0]);
        demoInfo(data.names[0]);

    });
 
}

function getPlotID(id) {
    d3.json("./data/samples.json").then((data) =>{
        // console.log(data);

        
        // GRAB DATA FOR PLOTS
        var samples = data.samples;
        var filtering = samples.filter(sampleobj => sampleobj.id == id);
        var result = filtering[0];
        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        
        // BAR PLOT
        
        var trace1 ={
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            hovertext: otu_labels.slice(0,10).reverse(),
            marker:{color: '#3366CC', alpha: .8},
            type:'bar',
            orientation:'h'
        };

        var data = [trace1];

        var layout = {
            margin:{
                l: 100,
                r: 80,
                t: 30,
                b: 30
            },
            yaxis:{tickmode:"linear"}
        };

        // create bar plot
        Plotly.newPlot("bar", data, layout);

        // BUBBLE CHART
  

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        }

        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data2 = [trace2]

        Plotly.newPlot("bubble", data2, layout2)
    });
};

//  DEMOGRAPHIC INFO

// grab data
function demoInfo(id){
    d3.json("./data/samples.json").then((data) =>{
        // console.log(data);

        // ALL METADATA
        var metadata = data.metadata;
        // console.log(metadata);

        // FILTER BY 
        var metaResult = metadata.filter(result => result.id.toString() === id)[0];
        // console.log(metaResult)

        // indicate where to add data on html
        var demographicInfo = d3.select("#sample-metadata");

        // delete previous data before displaying new one
        demographicInfo.html("");

        Object.entries(metaResult).forEach((key) =>{
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");

        });

    });

}

// NOW ADD OPTIONCHANGE TO CALL NECESSARY ID

function optionChanged(newid){
    getPlotID(newid);
    demoInfo(newid);
}

// Default rendering of page

init();