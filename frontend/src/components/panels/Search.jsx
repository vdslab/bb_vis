import SelectBox from "../organisms/serch/SelectBox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTeam, setSelectedDate, setSelectedFeature } from "../../store/GameStore";
import DatePicker from "../organisms/serch/DatePicker";

const Search = () => {
	const dispatch = useDispatch();

	const storeSelectedTeam = useSelector((state) => state.game.selectedTeam);
	const storeSelectedFeature = useSelector((state) => state.game.selectedFeature);
	const storeSelectedDate = useSelector((state) => state.game.selectedDate);

	const [teamValue, setTeamValue] = useState(storeSelectedTeam);
	const [featureValue, setFeatureValue] = useState(storeSelectedFeature || "");
	const [dateValue, setDateValue] = useState(storeSelectedDate);

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
		</div>
	);
};

export default Search;
