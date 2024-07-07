export default class Logger {
  static #instance: Logger;

  private constructor() {}

  public static get instance(): Logger {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }

    return Logger.#instance;
  }

  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  public warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  public error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}
