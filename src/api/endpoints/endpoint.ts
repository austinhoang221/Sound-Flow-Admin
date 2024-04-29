export default class Endpoint {
  public static get baseUrl(): string {
    return "https://localhost:7074/v1/";
  }

  public static readonly login: string = this.baseUrl + "auth/login";
}
