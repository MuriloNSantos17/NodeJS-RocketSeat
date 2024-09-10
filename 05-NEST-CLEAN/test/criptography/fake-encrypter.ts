import { Encrypter } from "@/domain/forum/application/criptography/ecrypter";

export class FakeEncrypter implements Encrypter {
    async ecrypt(payload: Record<string, unknown>): Promise<string> {
        return JSON.stringify(payload)
    }

}