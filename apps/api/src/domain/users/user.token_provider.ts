export interface TokenProvider {
  generate(userId: string): Promise<string>;
}