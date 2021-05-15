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

const COLOR = {
    darkest: "#367481",
    darker: "#428D9E",
    dark: "#3894A8",
    neutral: "#47ABC2",
    light: "#64B8CB",
    lighter: "#85C7D6",
    lightest: "#a3d5e0"
}


/*-------------------------------------Graph-------------------------------------*/

//Create SVG

const SVG = d3.select(".chart__container").append("svg");

SVG.attr("width", CHART__WIDTH).attr("height", CHART__HEIGHT).style("background-color", "#E6AC7A");

//Create title

const title = SVG.append("text");

title.attr("x", CHART__WIDTH / 2)
    .attr("y", MARGIN.top / 2)
    .attr("id", "title")
    .text("")
    .attr("text-anchor", "middle")

//Call Data DEGREE

const callDegree = async(URL) => {
    const fetchDegree = await fetch(URL);
    const degree = await fetchDegree.json();
}

//Call MAP API


const callMap = async(URL) => {

    const fetchUrl = await fetch(URL);
    const response = await fetchUrl.json();

    const path = d3.geoPath();
    const projection = d3.geoMercator()

    SVG.append("g")
        .selectAll("path")
        .data(response.objects.counties)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))






    console.log(response)


}

callMap(CHART__COUNTY)