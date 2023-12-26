import * as d3 from "d3";
import * as Geo from "../geo.json";
import { useRef, useEffect } from "react";

function Map(props) {
  const width = 1000;
  const height = 600;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 100,
  };

  const containerRef = useRef(null);
  useEffect(() => {
    d3.select(containerRef.current).selectAll("*").remove();
    const svg = d3.select(containerRef.current).append("svg");
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const projection = d3
      .geoMercator()
      .scale(70)
      .center([0, 20])
      .translate([width / 2 - margin.left, height / 2 - margin.top]);
    const g = svg.append("g");

    g.selectAll("path")
      .data(Geo.features)
      .enter()
      .append("path")
      .attr("class", "topo")
      .attr("d", d3.geoPath().projection(projection))
      .style("opacity", 0.7);

    svg
      .selectAll(".launchpads")
      .data(props.launchpads)
      .enter()
      .append("circle")
      .attr("class", "launchpads")
      .attr("cx", function (d) {
        return projection([d.longitude, d.latitude])[0];
      })
      .attr("cy", function (d) {
        return projection([d.longitude, d.latitude])[1];
      })
      .attr("id", function (d) {
        return d.id;
      })
      .attr("r", 5)
      .style("fill", "blue");
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", function (event) {
        g.selectAll("path").attr("transform", event.transform);
        svg
          .selectAll(".launchpads")
          .attr("cx", (d) =>
            event.transform.applyX(projection([d.longitude, d.latitude])[0])
          )
          .attr("cy", (d) =>
            event.transform.applyY(projection([d.longitude, d.latitude])[1])
          );
      });

    svg.call(zoom);
  }, [props.launchpads]);
  return <div className="mapContainer map" ref={containerRef}></div>;
}

export { Map };
