import { ApiService } from "./ApiService";

export class GameDetailService {
  /**
   * 試合IDから試合データを取得
   * @param {string} gamepk - 試合ID
   * @returns {Promise} - 試合詳細データ
   */
  static async getPlayDataById(gamepk) {
    const endpoint = ".netlify/functions/getPlayDataById";
    return ApiService.callGetApi(endpoint, {
      gamepk: gamepk,
    });
  }

  /**
   * 試合IDからムービーデータを取得
   * @param {string} gamepk - 試合ID
   * @returns {Promise} - 試合ムービーデータ
   */
  static async getMoviesById(gamepk) {
    const endpoint = ".netlify/functions/getMoviesById";
    return ApiService.callGetApi(endpoint, {
      gamepk: gamepk,
    });
  }

  /**
   * 試合IDリストから分析データを取得
   * @param {string} gamepk - 試合ID
   * @returns {Promise} - 分析データ
   */
  static async getAnalysisById(gamepk) {
    const endpoint = ".netlify/functions/getAnalysisById";
    return ApiService.callGetApi(endpoint, {
      gamepk: gamepk,
    });
  }
}
