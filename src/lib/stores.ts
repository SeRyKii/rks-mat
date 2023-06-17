// Export stores for posts

import { type Writable, writable } from 'svelte/store';
import type { Writable as WritableStore } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

import type { PostsResponse } from './pb_types';

export const posts: Writable<PostsResponse[]> = writable([]);
export const galleryPhotosNth: WritableStore<number> = localStorageStore('galleryPhotosNth', 0);
export const galleryPhotosId: WritableStore<string> = localStorageStore('galleryPhotosId', '');
