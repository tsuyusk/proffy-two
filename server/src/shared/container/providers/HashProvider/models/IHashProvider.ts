export default interface IHashProvider {
  compare(hashed: string, payload: string): Promise<boolean>;
  generate(payload: string): Promise<string>;
}
