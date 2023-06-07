import {
  Collections,
  type PostTagsResponse,
  type PostsResponse,
} from "$lib/pb_types";
import type { RequestHandler } from "./$types";

export const POST = (async (event) => {
  const body = await event.request.json();
  const posts = await event.locals.pb
    .collection(Collections.PostTags)
    .getList<PostTagsResponse>(body.page, body.limit, {
      expand: "post, tag, user",
      filter: `tag.name ?= "${body.tag}"`,
    });

  const reponse = new Response(JSON.stringify({ posts }), {
    status: 200,
  });

  return reponse;
}) satisfies RequestHandler;
