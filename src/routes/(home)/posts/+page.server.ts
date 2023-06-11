import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {
  Collections,
  type PostTagsResponse,
  type TagsResponse,
  type TournamentsResponse,
} from "$lib/pb_types";
import type { AchievementsResponse, PostsResponse } from "$lib/pb_types";

export const load = async ({ locals }) => {
  const posts = await locals.pb
    .collection(Collections.Posts)
    .getList<PostsResponse<{ blocks: any[] }>>(1, 10, {
      expand: "users",
      filter: "type = 0",
      sort: "-created",
    });
  const tags = await locals.pb
    .collection(Collections.Tags)
    .getFullList<TagsResponse>();
  const postTags = await locals.pb.collection(Collections.PostTags).getFullList<
    PostTagsResponse<{
      tag: { name: string };
      posts: PostsResponse<{ content: any }>;
    }>
  >({
    expand: "tag",
  });
  const userAvatars = new Map();

  for (const post of posts.items) {
    // change type of post.expand to any
    const expand = post.expand as any;
    if (!expand.users) continue;
    userAvatars.set(
      expand.users.id,
      locals.pb.getFileUrl(expand.users, expand.users.avatar)
    );
  }

  return {
    posts: structuredClone(posts),
    tags: structuredClone(tags),
    postTags: structuredClone(postTags),
    userAvatars,
  };
};
