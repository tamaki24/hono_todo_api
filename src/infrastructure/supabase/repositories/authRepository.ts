import type { Session, User } from "@supabase/auth-js";
import type { IAuthRepository } from "../../../domain/repositories/IAuthRepository.js";
import { supabase } from "../supabase.js";

export class AuthRepository implements IAuthRepository {
	async signUp(email: string, password: string): Promise<{ user: User }> {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			throw new Error(error.message);
		}

		if (!data.user) {
			throw new Error("An unexpected error occurred");
		}

		return { user: data.user };
	}

	async signIn(email: string, password: string): Promise<{ session: Session }> {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			throw new Error(error.message);
		}
		return { session: data.session };
	}

	async signOut(): Promise<void> {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw new Error(error.message);
		}
	}
}
