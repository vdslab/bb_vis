import SelectBox from "../organisms/serch/SelectBox";
import { useState } from "react";

const Search = () => {
  const [teamValue, setTeamValue] = useState("");
  const [featureValue, setFeatureValue] = useState("");

  // TODO: dataを実際のデータに変更する
  const teamOptions = [
    { value: "team1", label: "Team 1" },
    { value: "team2", label: "Team 2" },
    { value: "team3", label: "Team 3" },
  ];

  const featureOptions = [
    { value: "feature1", label: "Feature 1" },
    { value: "feature2", label: "Feature 2" },
    { value: "feature3", label: "Feature 3" },
  ];

  return (
    <div className="panel-screen search-panel">
      <div className="panel-header">
        <h2>Search</h2>
      </div>
      <div className="panel-content search-box">
        <div className="search-box-item1">
          <div className="search-box-item1-team">
            <SelectBox
              label="Team"
              value={teamValue}
              onChange={(event) => setTeamValue(event.target.value)}
              options={teamOptions}
            />
          </div>
          <div className="search-box-item1-feature">
            <SelectBox
              label="Feature"
              value={featureValue}
              onChange={(event) => setFeatureValue(event.target.value)}
              options={featureOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
