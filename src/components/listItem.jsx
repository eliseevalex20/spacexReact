import * as d3 from "d3";
function ListItem({ launch }) {
  const handleMouseEnter = () => {
    d3.select(`circle[id='${launch.launchpad}']`).raise().style("fill", "red");
  };

  const handleMouseLeave = () => {
    d3.select(`circle[id='${launch.launchpad}']`).raise().style("fill", "blue");
  };
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {launch.name}
    </li>
  );
}
export { ListItem };
