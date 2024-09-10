export abstract class Encrypter {
    abstract ecrypt(payload: Record<string, unknown>): Promise<string>
}