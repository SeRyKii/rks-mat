import PocketBase from 'pocketbase';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type PocketBase from 'pocketbase';
declare global {
	declare namespace App {
		interface Locals {
			pb: PocketBase;
			user: any | undefined;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

declare module 'fetch-meta-tags';
