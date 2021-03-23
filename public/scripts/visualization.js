/* global d3 topojson*/

( async function () {
    
    /// standard set of stuff
    
    const margin = { top: 0, left: 0, right: 0, bottom: 0}
    const height = 400 - margin.top - margin.bottom
    const width = 800 - margin.right - margin.left
    
    let svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin. right)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        
    /// read in the files 
    let data = await get_file("./data/states.json") // actually topojson
    
    // set the projection
    let projection = d3.geoAlbersUsa()
        .translate([ width / 2, height / 2])
        .scale(800)
        
    // create a path
    let path = d3.geoPath()
        .projection(projection)
        
    console.log(data)
    
    // standard topojson setup for assinging to an "object" in the file
    var regions = topojson.feature(data, data.objects.states).features
    
    console.log(regions)
    
    svg.selectAll(".regions") // add elements to the svg
        .data(regions)        // bind the data
        .enter().append("path")  // add path elements
        .attr("class", "region") // add a style class
        .attr("d", path)       // every svg needs a "d" to draw something (definition?)
    
    
    async function get_file(filename) {
        
        let file_json = d3.json(filename)
        return(file_json)
            
    }
    
})()