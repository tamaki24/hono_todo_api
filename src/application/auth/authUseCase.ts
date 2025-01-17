import type { IAuthRepository } from "../../domain/repositories/IAuthRepository.js";

export class AuthUseCase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async signUp(email: string, password: string) {
    return this.authRepository.signUp(email, password);
  }

  async signIn(email: string, password: string) {
    return this.authRepository.signIn(email, password);
  }

  async signOut() {
    return this.authRepository.signOut();
  }
}
