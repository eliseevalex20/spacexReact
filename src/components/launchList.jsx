import { ListItem } from "./listItem";

function LaunchList(props) {
  return (
    <aside className="aside" id="launchesContainer">
      <h3>Launches</h3>
      <div id="listContainer">
        <ul>
          {props.launches.map((launch) => {
            return <ListItem launch={launch} key={launch.id} />;
          })}
        </ul>
      </div>
    </aside>
  );
}

export { LaunchList };
