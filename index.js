/*-------------------------------------INIT-------------------------------------*/

const CHART__HEIGHT = 500;
const CHART__WIDTH = 900;
const CHART__EDUCATION = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const CHART__COUNTY = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const MARGIN = {
    top: 100,
    right: 50,
    bottom: 100,
    left: 100
}

/*-------------------------------------Title and description-------------------------------------*/

//create title

const title = d3.select(".chart__container").append("div");

title.append("h1")
    .attr("id", "title")
    .text("United States Educational Attainment")
    .style("text-align", "center")

//create description

const description = d3.select(".chart__container").append("div");

description.append("h3")
    .attr("id", "description")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
    .style("text-align", "center")
    .style("font-size", "16px")


/*-------------------------------------Graph-------------------------------------*/

//Create SVG

const SVG = d3.select(".chart__container").append("svg");

SVG.attr("width", CHART__WIDTH).attr("height", CHART__HEIGHT).style("border", "1px solid black");


//Call MAP API and Call Data DEGREE


const callMap = async(urlMap, urlDegree) => {

    const fetchMap = await fetch(urlMap);
    const mapData = await fetchMap.json();

    const fetchDegree = await fetch(urlDegree);
    const degree = await fetchDegree.json();
    console.log(degree);
    const minDegree = d3.min(degree.map(e => e.bachelorsOrHigher))
    const maxDegree = d3.max(degree.map(e => e.bachelorsOrHigher))
    const COLOR = d3.scaleThreshold().domain(d3.range(minDegree, maxDegree, (maxDegree - minDegree) / 6)).range(d3.schemeOranges[7]);
    const COLOR__LEGEND__VALUE = d3.range(minDegree, maxDegree, (maxDegree - minDegree) / 6);
    COLOR__LEGEND__VALUE.push(70);


    //function to attribute the good color

    const checkColor = (id) => {
        const result = degree.filter(e => e.fips === id);
        const color = result[0].bachelorsOrHigher;
        return COLOR(color)
    }

    //function to attribute the degree

    const checkDegree = (id) => {
        const result = degree.filter(e => e.fips === id);
        const idDegree = result[0].bachelorsOrHigher;
        return idDegree;
    }


    //Create the map

    let feature = topojson.feature(mapData, mapData.objects.counties)
    const path = d3.geoPath();

    const map = SVG.append("g")
    map
        .selectAll("path")
        .data(feature.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("transform", "scale(0.8, 0.8)")
        .attr("class", "county")
        .style("fill", d => checkColor(d.id))
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => checkDegree(d.id))

    map.attr("transform", "translate(30, 10)")


    /*-------------------------------------Legend-------------------------------------*/
    //Legend's scale
    const yScale = d3.scaleBand().domain(COLOR__LEGEND__VALUE.map(x => x)).range(CHART__HEIGHT - MARGIN.bottom, MARGIN.top)
    const legend = SVG.append("g")
    legend.attr("id", "legend")
        .selectAll("rect")
        .data(COLOR__LEGEND__VALUE)
        .enter()
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("y", d => yScale(d))
        .attr("fill", d => COLOR(d))




    //create tooltip

    //hover effect









}

callMap(CHART__COUNTY, CHART__EDUCATION)