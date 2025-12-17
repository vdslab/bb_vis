//  英語→日本語
const TEAM_NAME_MAP = {
  "Diamondbacks": "ダイヤモンドバックス",
  "Braves": "ブレーブス",
  "Orioles": "オリオールズ",
  "Red Sox": "レッドソックス",
  "Cubs": "カブス",
  "White Sox": "ホワイトソックス",
  "Reds": "レッズ",
  "Guardians": "ガーディアンズ",
  "Rockies": "ロッキーズ",
  "Tiggers": "タイガース",
  "Astros": "アストロズ",
  "Royals": "ロイヤルズ",
  "Angels": "エンゼルス",
  "Dodgers": "ドジャース",
  "Marlins": "マーリンズ",
  "Brewers": "ブルワーズ",
  "Twins": "ツインズ",
  "Mets": "メッツ",
  "Yankees": "ヤンキース",
  "Athletics": "アスレチックス",
  "Phillies": "フィリーズ",
  "Pirates": "パイレーツ",
  "Padres": "パドレス",
  "Giants": "ジャイアンツ",
  "Mariners": "マリナーズ",
  "Cardinals": "カージナルス",
  "Rays": "レイズ",
  "Rangers": "レンジャーズ",
  "BlueJays": "ブルージェイズ",
  "Nationals": "ナショナルズ",
};

//  日本語変換
export const getJPTeamName = (name) => {
  return TEAM_NAME_MAP[name] || null;
};
