import type { LayoutServerLoad } from "./$types";
import { Collections, type PostsResponse } from "$lib/pb_types";

export const load = (async ({ locals }) => {
  const posts = await locals.pb
    .collection(Collections.Posts)
    .getList<PostsResponse>(1, 4, {
      expand: "users",
      filter: "type = 0",
      sort: "-created",
      $autoCancel: false,
    });
  return {
    posts: structuredClone(posts),
    user: {
      ...locals.user,
      avatarUrl: !locals.user
        ? ""
        : locals.pb.getFileUrl(locals.user, locals.user?.avatar),
    },
  };
}) as LayoutServerLoad;
