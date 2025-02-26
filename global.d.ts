export {};

declare global {
  interface Window {
    ENV: {
      JUKI_SERVICE_V1_URL: string,
      JUKI_SERVICE_V2_URL: string,
      JUKI_SOCKET_BASE_URL: string,
      JUKI_TOKEN_NAME: string,
    };
  }
}
