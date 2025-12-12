import SelectBox from "../organisms/serch/SelectBox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTeam,
  setSelectedDate,
  setSelectedFeature,
  setSortType,
  setShowAllGames,
  setFilteredGamePks,
} from "../../store/GameStore";
import DatePicker from "../organisms/serch/DatePicker";
import CheckBox from "../atoms/CheckBox";
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
import { setStopMovieAutoScroll } from "../../store/DebugStore";
import { setShowGamePk } from "../../store/DebugStore";
// devonly:end

const Search = () => {
  const dispatch = useDispatch();

  const storeSelectedTeam = useSelector((state) => state.game.selectedTeam);
  const storeSelectedFeature = useSelector((state) => state.game.selectedFeature);
  const storeSelectedDate = useSelector((state) => state.game.selectedDate);
  const storeSortType = useSelector((state) => state.game.sortType);
  const storeShowAllGames = useSelector((state) => state.game.showAllGames);
  const storeGameData = useSelector((state) => state.game.gameData);
  const storeIsDataLoaded = useSelector((state) => state.game.isDataLoaded);

  const [teamValue, setTeamValue] = useState(storeSelectedTeam);
  const [featureValue, setFeatureValue] = useState(storeSelectedFeature || "");
  const [dateValue, setDateValue] = useState(storeSelectedDate);
  const [sortValue, setSortValue] = useState(storeSortType);
  const [showAllGamesValue, setShowAllGamesValue] = useState(storeShowAllGames);

  // devonly:start
  const gameData = useSelector((state) => state.game.gameData);
  const stopMovieAutoScroll = useSelector((state) => state.debug.stopMovieAutoScroll);
  const showGamePk = useSelector((state) => state.debug.showGamePk);
  const debugMode = useSelector((state) => state.debug.debugMode);
  const [gamePkValue, setGamePkValue] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  const handleStopMovieAutoScrollChange = (event) => {
    dispatch(setStopMovieAutoScroll(event.target.checked));
  };
  const handleShowGamePk = (event) => {
    dispatch(setShowGamePk(event.target.checked));
  };

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
    setSortValue(storeSortType);
    setShowAllGamesValue(storeShowAllGames);
  }, [
    storeSelectedTeam,
    storeSelectedFeature,
    storeSelectedDate,
    storeSortType,
    storeShowAllGames,
  ]);

  useEffect(() => {
    dispatch(setSelectedTeam(teamValue));
    dispatch(setSelectedFeature(featureValue));
    dispatch(setSelectedDate(dateValue));
    dispatch(setSortType(sortValue));
    dispatch(setShowAllGames(showAllGamesValue));
  }, [teamValue, featureValue, dateValue, sortValue, showAllGamesValue, dispatch]);

  // フィルタリング・ソート・制限の処理
  useEffect(() => {
    if (!storeIsDataLoaded || storeGameData.length === 0) {
      return;
    }

    // チームフィルタリング（配列のコピーを作成）
    let filteredData = [...storeGameData];
    if (teamValue !== "All") {
      filteredData = filteredData.filter(
        (item) => item.team.home === teamValue || item.team.away === teamValue,
      );
    }

    // 日付フィルタリング
    if (dateValue.startDate || dateValue.endDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = item.date;
        const startDate = dateValue.startDate;
        const endDate = dateValue.endDate;

        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    // ソート処理
    if (sortValue === "日付（新しい順）") {
      filteredData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (sortValue === "評価（高い順）") {
      filteredData.sort((a, b) => {
        const evalA = a.evaluation_score || 0;
        const evalB = b.evaluation_score || 0;
        return evalB - evalA;
      });
    }

    // 全件表示がfalseの場合、50件に制限
    if (!showAllGamesValue && filteredData.length > 50) {
      filteredData = filteredData.slice(0, 50);
    }

    // filteredGamePksを更新
    dispatch(setFilteredGamePks(filteredData.map((item) => item.gamepk)));
  }, [
    storeGameData,
    storeIsDataLoaded,
    teamValue,
    dateValue,
    sortValue,
    showAllGamesValue,
    dispatch,
  ]);

  const teamOptions = [
    { value: "All", label: "All（すべて）" },
    { value: "Los Angeles Dodgers", label: "Dodgers（ドジャース）" },
    { value: "Chicago Cubs", label: "Cubs（カブス）" },
    { value: "Milwaukee Brewers", label: "Brewers（ブルワーズ）" },
    { value: "New York Yankees", label: "Yankees（ヤンキース）" },
    { value: "Baltimore Orioles", label: "Orioles（オリオールズ）" },
    { value: "Toronto Blue Jays", label: "Blue Jays（ブルージェイズ）" },
    { value: "Boston Red Sox", label: "Red Sox（レッドソックス）" },
    { value: "Texas Rangers", label: "Rangers（レンジャーズ）" },
    { value: "Philadelphia Phillies", label: "Phillies（フィリーズ）" },
    { value: "Washington Nationals", label: "Nationals（ナショナルズ）" },
    { value: "Cleveland Guardians", label: "Guardians（ガーディアン）" },
    { value: "Kansas City Royals", label: "Royals（ロイヤルズ）" },
    { value: "New York Mets", label: "Mets（メッツ）" },
    { value: "Houston Astros", label: "Astros（アストロズ）" },
    { value: "San Francisco Giants", label: "Giants（ジャイアンツ）" },
    { value: "Cincinnati Reds", label: "Reds（レッズ）" },
    { value: "Atlanta Braves", label: "Braves（ブレーブス）" },
    { value: "San Diego Padres", label: "Padres（パドレス）" },
    { value: "Los Angeles Angels", label: "Angels（エンジェルス）" },
    { value: "Chicago White Sox", label: "White Sox（ホワイトソックス）" },
    { value: "Pittsburgh Pirates", label: "Pirates（パイレーツ）" },
    { value: "Miami Marlins", label: "Marlins（マリーンズ）" },
    { value: "Minnesota Twins", label: "Twins（ツインズ）" },
    { value: "St. Louis Cardinals", label: "Cardinals（カージナルス）" },
    { value: "Detroit Tigers", label: "Tigers（タイガーズ）" },
    { value: "Arizona Diamondbacks", label: "Diamondbacks（ダイアモンドバックス）" },
    { value: "Athletics", label: "Athletics（アスレチックス）" },
    { value: "Seattle Mariners", label: "Mariners（マリナーズ）" },
    { value: "Colorado Rockies", label: "Rockies（ロッキーズ）" },
    { value: "Tampa Bay Rays", label: "Rays（レイズ）" },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const sortOptions = [
    { value: "評価（高い順）", label: "評価（高い順）" },
    { value: "日付（新しい順）", label: "日付（新しい順）" },
  ];

  const handleShowAllGamesChange = (event) => {
    setShowAllGamesValue(event.target.checked);
  };

  return (
    <div className="panel-screen search-panel">
      <div className="search-panel-header">
        <h2>絞り込み</h2>
      </div>
      <div className="search-box">
        <div className="search-box-team">
          <SelectBox
            label="チーム"
            value={teamValue}
            onChange={(event) => setTeamValue(event.target.value)}
            options={teamOptions}
          />
        </div>
        <div className="search-box-date">
          <DatePicker
            label="日付"
            value={dateValue}
            onChange={(event) => setDateValue(event.target.value)}
          />
        </div>
        <div className="search-box-sort">
          <div className="search-box-sort-label-row">
            <span className="search-label">表示順</span>
            <CheckBox
              label="全件表示"
              checked={showAllGamesValue}
              onChange={handleShowAllGamesChange}
            />
          </div>
          <SelectBox
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
            options={sortOptions}
          />
        </div>
      </div>
      {/* devonly:start */}
      {debugMode && (
        <div className="debug-tool">
          <p>Debug Field:</p>
          <CheckBox
            label="Stop Movie Auto Scroll"
            checked={stopMovieAutoScroll}
            onChange={handleStopMovieAutoScrollChange}
          />
          <CheckBox label="Show Game PK" checked={showGamePk} onChange={handleShowGamePk} />
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
      )}
      {/* devonly:end */}
    </div>
  );
};

export default Search;
