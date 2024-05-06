export default class Endpoint {
  public static get baseUrl(): string {
    return "https://localhost:7074/v1/";
  }

  public static readonly Login: string = this.baseUrl + "auth/login";
  public static readonly Album: string = this.baseUrl + "album";
  public static readonly Genre: string = this.baseUrl + "genre";
  public static readonly Track: string = this.baseUrl + "track";
}
