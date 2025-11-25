import SelectBox from "../organisms/serch/SelectBox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTeam, setSelectedDate, setSelectedFeature } from "../../store/GameStore";
import DatePicker from "../organisms/serch/DatePicker";
// devonly:start
import InputField from "../organisms/serch/InputField";
import {
  setGamePk,
  setHighlightData,
  setSelectedGameAwayTeam,
  setSelectedGameHomeTeam,
  setSelectedGameDate,
  setHighlightFromParallelCoordinates,
} from "../../store/GameStore";
// devonly:end

const Search = () => {
  const dispatch = useDispatch();

  const storeSelectedTeam = useSelector((state) => state.game.selectedTeam);
  const storeSelectedFeature = useSelector((state) => state.game.selectedFeature);
  const storeSelectedDate = useSelector((state) => state.game.selectedDate);

  const [teamValue, setTeamValue] = useState(storeSelectedTeam);
  const [featureValue, setFeatureValue] = useState(storeSelectedFeature || "");
  const [dateValue, setDateValue] = useState(storeSelectedDate);

  // devonly:start
  const gameData = useSelector((state) => state.game.gameData);
  const [gamePkValue, setGamePkValue] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const handleGamePkClick = () => {
    const gamePk = Number(gamePkValue);
    const game = gameData.find((g) => g.gamepk === gamePk);
    if (
      game &&
      (teamValue === "All" || game.team.away === teamValue || game.team.home === teamValue)
    ) {
      dispatch(setGamePk(gamePk));
      dispatch(setHighlightData(gamePk));
      dispatch(setHighlightFromParallelCoordinates(false));
      dispatch(setSelectedGameDate(game.date));
      dispatch(setSelectedGameAwayTeam(game.team.away));
      dispatch(setSelectedGameHomeTeam(game.team.home));
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }
  };
  // devonly:end

  useEffect(() => {
    setTeamValue(storeSelectedTeam);
    setFeatureValue(storeSelectedFeature || "");
    setDateValue(storeSelectedDate);
  }, [storeSelectedTeam, storeSelectedFeature, storeSelectedDate]);

  useEffect(() => {
    dispatch(setSelectedTeam(teamValue));
    dispatch(setSelectedFeature(featureValue));
    dispatch(setSelectedDate(dateValue));
  }, [teamValue, featureValue, dateValue, dispatch]);

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

  return (
    <div className="panel-screen search-panel">
      <div className="search-panel-header">
        <h2>Filters</h2>
      </div>
      <div className="search-box">
        <div className="search-box-team">
          <SelectBox
            label="Team"
            value={teamValue}
            onChange={(event) => setTeamValue(event.target.value)}
            options={teamOptions}
          />
        </div>
        <div className="search-box-date">
          <DatePicker
            label="Date"
            value={dateValue}
            onChange={(event) => setDateValue(event.target.value)}
          />
        </div>
      </div>
      {/* devonly:start */}
      <div className="debug-tool">
        Debug Field:
        <InputField
          label="Game PK"
          value={gamePkValue}
          onButtonClick={handleGamePkClick}
          onChange={(event) => setGamePkValue(event.target.value)}
        />
        {isNotFound && (
          <p style={{ color: "red", fontSize: "10px" }}>gamepk: {gamePkValue} not found</p>
        )}
      </div>
      {/* devonly:end */}
    </div>
  );
};

export default Search;
