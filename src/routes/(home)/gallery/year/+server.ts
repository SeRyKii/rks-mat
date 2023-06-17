import {
  Collections,
  type TournamentsByYearRecord,
  type TournamentsByYearResponse,
} from "$lib/pb_types";
import type { RequestHandler } from "./$types";

export const POST = (async (event) => {
  const body = await event.request.json();

  const photo = await event.locals.pb
    .collection(Collections.TournamentsByYear)
    .getList<TournamentsByYearResponse>(0, 32, {
      filter: `year   = '${body.year}'`,
    });
  const photos: TournamentsByYearRecord[] = [];
  photo.items.forEach((item) => {
    item.photo = event.locals.getFile(
      "mpzr3s6p7kf0noq",
      item.photoId,
      item.photo as string
    );
    photos.push(item);
  });

  const reponse = new Response(JSON.stringify(photos), {
    status: 200,
  });

  return reponse;
}) satisfies RequestHandler;
