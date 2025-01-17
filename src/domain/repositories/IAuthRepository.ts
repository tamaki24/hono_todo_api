import type { User, Session } from "@supabase/supabase-js/dist/main/index.js";

export interface IAuthRepository {
	signUp(email: string, password: string): Promise<{ user: User }>;
	signIn(email: string, password: string): Promise<{ session: Session }>;
	signOut(): Promise<void>;
}
