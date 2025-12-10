/**
 * ベース間の経路計算ユーティリティ
 */

// ベースの位置座標（%）
export const BASE_POSITIONS = {
  home: { top: 75, left: 52 },
  first: { top: 59, left: 67 },
  second: { top: 42, left: 52 },
  third: { top: 59, left: 37 },
};

/**
 * ベース間の経路を計算（経由ベースを含む）
 * @param {string} from - 開始ベース
 * @param {string} to - 終了ベース
 * @returns {string[]} ベースの経路配列
 */
export const calculateBasePath = (from, to) => {
  const baseOrder = ["first", "second", "third"];
  const fromIndex = baseOrder.indexOf(from);
  const toIndex = baseOrder.indexOf(to);

  if (fromIndex === -1 || toIndex === -1) return [from, to];

  // 進塁方向
  if (toIndex > fromIndex) {
    // 例: first -> third の場合 [first, second, third]
    return baseOrder.slice(fromIndex, toIndex + 1);
  } else {
    // 後退（稀だが）
    return baseOrder.slice(toIndex, fromIndex + 1).reverse();
  }
};

/**
 * ホームから特定のベースへの経路を計算
 * @param {string} toBase - 到達ベース
 * @returns {string[]} ベースの経路配列
 */
export const calculateBasePathFromHome = (toBase) => {
  const baseOrder = ["home", "first", "second", "third"];
  const toIndex = baseOrder.indexOf(toBase);
  if (toIndex === -1) return ["home", toBase];
  return baseOrder.slice(0, toIndex + 1);
};

/**
 * 特定のベースからホームへの経路を計算
 * @param {string} fromBase - 開始ベース
 * @returns {string[]} ベースの経路配列
 */
export const calculateBasePathToHome = (fromBase) => {
  const baseOrder = ["first", "second", "third", "home"];
  const fromIndex = baseOrder.indexOf(fromBase);
  if (fromIndex === -1) return [fromBase, "home"];
  return baseOrder.slice(fromIndex);
};
