import { ApiService } from "./ApiService";

export class GameDetailService {
  /**
   * 試合IDから詳細を取得
   * @param {string} gamepk - 試合ID
   * @returns {Promise} - 試合詳細データ
   */
  static async getDetailById(gamepk) {
    const endpoint = ".netlify/functions/getDetailById";
    return ApiService.callGetApi(endpoint, {
      gamepk: gamepk,
    });
  }
}
