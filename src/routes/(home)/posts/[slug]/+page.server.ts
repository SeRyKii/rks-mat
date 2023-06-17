import type { PageServerLoad } from "./$types";
import {
  Collections,
  type PostsResponse,
  type PostTagsResponse,
  type TagsRecord,
  type TagsResponse,
  type UsersResponse,
} from "$lib/pb_types";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
  try {
    const post = await locals.pb
      .collection(Collections.Posts)
      .getOne<PostsResponse<any, { users: UsersResponse }>>(params.slug, {
        expand: "users",
      });
    const tags = await locals.pb
      .collection(Collections.PostTags)
      .getFullList<PostTagsResponse<{ tag: TagsResponse }>>({
        filter: `post = '${params.slug}'`,
        expand: "tag",
      });
    const expand = post.expand as any;
    const userAvatar = await locals.pb.getFileUrl(
      expand.users,
      expand.users?.avatar
    );

    return {
      post: structuredClone(post),
      tags: structuredClone(tags),
      userAvatar,
    };
  } catch (err) {
    throw error(404);
  }
}) satisfies PageServerLoad;
