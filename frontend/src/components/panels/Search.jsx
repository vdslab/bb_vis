import SelectBox from "../organisms/serch/SelectBox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTeam, setSelectedDate } from "../../store/GameStore";
import { useEffect } from "react";
import DatePicker from "../organisms/serch/DatePicker";

const Search = () => {
  const [teamValue, setTeamValue] = useState("All");
  const [featureValue, setFeatureValue] = useState("");
  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedTeam(teamValue));
    dispatch(setSelectedDate(dateValue));
  }, [teamValue, dateValue, dispatch]);

  // MLB teams from the JSON data
  const teamOptions = [
    { value: "All", label: "All" },
    { value: "Los Angeles Dodgers", label: "Dodgers" },
    { value: "Chicago Cubs", label: "Cubs" },
    { value: "Milwaukee Brewers", label: "Brewers" },
    { value: "New York Yankees", label: "Yankees" },
    { value: "Baltimore Orioles", label: "Orioles" },
    { value: "Toronto Blue Jays", label: "Blue Jays" },
    { value: "Boston Red Sox", label: "Red Sox" },
    { value: "Texas Rangers", label: "Rangers" },
    { value: "Philadelphia Phillies", label: "Phillies" },
    { value: "Washington Nationals", label: "Nationals" },
    { value: "Cleveland Guardians", label: "Guardians" },
    { value: "Kansas City Royals", label: "Royals" },
    { value: "New York Mets", label: "Mets" },
    { value: "Houston Astros", label: "Astros" },
    { value: "San Francisco Giants", label: "Giants" },
    { value: "Cincinnati Reds", label: "Reds" },
    { value: "Atlanta Braves", label: "Braves" },
    { value: "San Diego Padres", label: "Padres" },
    { value: "Los Angeles Angels", label: "Angels" },
    { value: "Chicago White Sox", label: "White Sox" },
    { value: "Pittsburgh Pirates", label: "Pirates" },
    { value: "Miami Marlins", label: "Marlins" },
    { value: "Minnesota Twins", label: "Twins" },
    { value: "St. Louis Cardinals", label: "Cardinals" },
    { value: "Detroit Tigers", label: "Tigers" },
    { value: "Arizona Diamondbacks", label: "Diamondbacks" },
    { value: "Athletics", label: "Athletics" },
    { value: "Seattle Mariners", label: "Mariners" },
    { value: "Colorado Rockies", label: "Rockies" },
    { value: "Tampa Bay Rays", label: "Rays" },
  ].sort((a, b) => a.label.localeCompare(b.label));

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
        <div className="search-box-item2">
          <div className="search-box-item2-date">
            <DatePicker
              label="Date"
              value={dateValue}
              onChange={(event) => setDateValue(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
