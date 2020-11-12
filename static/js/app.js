d3.json("./data/samples.json").then((data) =>{
    console.log(data);

    console.log(data.samples[0].otu_ids.slice(0,10))
    console.log(data.samples[0].sample_values.slice(0,10))










});

