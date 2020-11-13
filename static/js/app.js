function getPlotID(id) {
    d3.json("./data/samples.json").then((data) =>{
        console.log(data);

        var ids = data.samples[0].otu_ids;
        console.log(ids)

        // console.log(data.samples[0].otu_ids.slice(0,10))
        // console.log(data.samples[0].sample_values.slice(0,10))










    });
};

// getPlotID(940);

// Default rendering of page
function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("./data/samples.json").then((data) =>{
        console.log(data)

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        getPlotID(data.names[0]);

    });
 
}

init();