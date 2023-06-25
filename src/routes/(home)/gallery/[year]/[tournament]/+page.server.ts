import {
  Collections,
  type PhotosResponse,
  type TournamentsByYearResponse,
  type TournamentsResponse,
} from "$lib/pb_types";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { year, tournament } = event.params;

  const photo = await event.locals.pb
    .collection(Collections.Photos)
    .getList<PhotosResponse<{ tournament: TournamentsResponse }>>(0, 32, {
      filter: `tournament = '${tournament}'`,
      sort: "+created",
      expand: "tournament",
    });
  const photos: PhotosResponse<{ tournament: TournamentsResponse }>[] = [];
  photo.items.forEach((item) => {
    item.photo = event.locals.getFile(
      "mpzr3s6p7kf0noq",
      item.id,
      item.photo as string
    );
    photos.push(item);
  });

  return {
    photos: structuredClone(photos),
    year,
    tournament,
  };
}) satisfies PageServerLoad;
