function getPlotID(id) {
    d3.json("./data/samples.json").then((data) =>{
        // console.log(data);

        // GRAB DATA FOR PLOTS
        
        var ids = data.samples[0].otu_ids.slice(0,10).reverse();
        // console.log(ids)

        var allIDs =  data.samples[0].otu_ids
        // console.log(allIDs)

        var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
        // console.log(sampleValues)

        var allValues =  data.samples[0].sample_values
        
        var labels = data.samples[0].otu_labels.slice(0,10).reverse();
        // console.log(labels)
        
        var allLabels = data.samples[0].otu_labels

        var otuID = ids.map(d => "OTU " + d);
        // console.log(`OTU IDS: ${otuID}`)
        
        // BAR PLOT
        
        var trace1 ={
            x: sampleValues,
            y: otuID,
            hovertext: labels,
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
            x: allIDs,
            y: allValues,
            mode: "markers",
            marker:{
                size: allValues,
                color: allIDs
            },
            text: allLabels
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

// getPlotID(940);

//  DEMOGRAPHIC INFO

// grab data
function demoInfo(id){
    d3.json("./data/samples.json").then((data) =>{
        // console.log(data);

        // ALL METADATA
        var metadata = data.metadata;
        console.log(metadata);

        // FILTER BY 

    })

}

// Default rendering of page
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

init();