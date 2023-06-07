// Export stores for posts

import { type Writable, writable } from 'svelte/store';
import type { PostsResponse } from './pb_types';

export const posts: Writable<PostsResponse[]> = writable([]);
