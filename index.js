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


/*-------------------------------------Graph-------------------------------------*/

//Create SVG

const SVG = d3.select(".chart__container").append("svg");

SVG.attr("width", CHART__WIDTH).attr("height", CHART__HEIGHT);

//Create title

const title = SVG.append("text");

title.attr("x", CHART__WIDTH / 2)
    .attr("y", MARGIN.top / 2)
    .attr("id", "title")
    .text("")
    .attr("text-anchor", "middle")


const callApi = async(URL) => {

    const fetchUrl = await fetch(URL);
    const response = await fetchUrl.json();

    console.log(response)


}

callApi(CHART__EDUCATION)