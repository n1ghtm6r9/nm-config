export class InvalidConfigFileError extends Error {
  constructor(fileName: string) {
    super(`Config '${fileName}' is not valid.`);
  }
}
