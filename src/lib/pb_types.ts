/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	TournamentsByYear = "TournamentsByYear",
	Achievements = "achievements",
	Analytics = "analytics",
	AnalyticsCount = "analyticsCount",
	AnalyticsUnique = "analyticsUnique",
	AnalyticsUniqueCount = "analyticsUniqueCount",
	Files = "files",
	Photos = "photos",
	PostTags = "postTags",
	Posts = "posts",
	PostsCount = "postsCount",
	PostsDeleted = "postsDeleted",
	PostsDraft = "postsDraft",
	Tags = "tags",
	Tournaments = "tournaments",
	Users = "users",
	Years = "years",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type TournamentsByYearRecord<Tphoto = unknown, Tyear = unknown> = {
	year?: null | Tyear
	photo?: null | Tphoto
	photoId?: RecordIdString
	name?: string
}

export type AchievementsRecord = {
	description?: string
	post?: RecordIdString
	color?: string
	emoji?: string
}

export type AnalyticsRecord = {
	user_agent?: string
	ip?: string
}

export type AnalyticsCountRecord = {
	nth?: number
}

export type AnalyticsUniqueRecord = never

export type AnalyticsUniqueCountRecord = {
	nth?: number
}

export type FilesRecord = {
	file?: string
}

export type PhotosRecord = {
	photo?: string
	tournament?: RecordIdString
}

export type PostTagsRecord = {
	post?: RecordIdString
	tag?: RecordIdString
}

export type PostsRecord<Tcontent = unknown> = {
	title?: string
	type?: number
	content?: null | Tcontent
	users?: RecordIdString
}

export type PostsCountRecord = {
	nth?: number
}

export type PostsDeletedRecord = {
	nth?: number
}

export type PostsDraftRecord = {
	nth?: number
}

export type TagsRecord = {
	name?: string
}

export type TournamentsRecord = {
	name?: string
	startDate?: IsoDateString
	link?: string
	color?: string
	endDate?: IsoDateString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

export type YearsRecord<Tphoto = unknown, Tyear = unknown> = {
	photo?: null | Tphoto
	year?: null | Tyear
	photoId?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type TournamentsByYearResponse<Tphoto = unknown, Tyear = unknown, Texpand = unknown> = Required<TournamentsByYearRecord<Tphoto, Tyear>> & BaseSystemFields<Texpand>
export type AchievementsResponse<Texpand = unknown> = Required<AchievementsRecord> & BaseSystemFields<Texpand>
export type AnalyticsResponse<Texpand = unknown> = Required<AnalyticsRecord> & BaseSystemFields<Texpand>
export type AnalyticsCountResponse<Texpand = unknown> = Required<AnalyticsCountRecord> & BaseSystemFields<Texpand>
export type AnalyticsUniqueResponse<Texpand = unknown> = Required<AnalyticsUniqueRecord> & BaseSystemFields<Texpand>
export type AnalyticsUniqueCountResponse<Texpand = unknown> = Required<AnalyticsUniqueCountRecord> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type PhotosResponse<Texpand = unknown> = Required<PhotosRecord> & BaseSystemFields<Texpand>
export type PostTagsResponse<Texpand = unknown> = Required<PostTagsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Tcontent = unknown, Texpand = unknown> = Required<PostsRecord<Tcontent>> & BaseSystemFields<Texpand>
export type PostsCountResponse<Texpand = unknown> = Required<PostsCountRecord> & BaseSystemFields<Texpand>
export type PostsDeletedResponse<Texpand = unknown> = Required<PostsDeletedRecord> & BaseSystemFields<Texpand>
export type PostsDraftResponse<Texpand = unknown> = Required<PostsDraftRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type TournamentsResponse<Texpand = unknown> = Required<TournamentsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type YearsResponse<Tphoto = unknown, Tyear = unknown, Texpand = unknown> = Required<YearsRecord<Tphoto, Tyear>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	TournamentsByYear: TournamentsByYearRecord
	achievements: AchievementsRecord
	analytics: AnalyticsRecord
	analyticsCount: AnalyticsCountRecord
	analyticsUnique: AnalyticsUniqueRecord
	analyticsUniqueCount: AnalyticsUniqueCountRecord
	files: FilesRecord
	photos: PhotosRecord
	postTags: PostTagsRecord
	posts: PostsRecord
	postsCount: PostsCountRecord
	postsDeleted: PostsDeletedRecord
	postsDraft: PostsDraftRecord
	tags: TagsRecord
	tournaments: TournamentsRecord
	users: UsersRecord
	years: YearsRecord
}

export type CollectionResponses = {
	TournamentsByYear: TournamentsByYearResponse
	achievements: AchievementsResponse
	analytics: AnalyticsResponse
	analyticsCount: AnalyticsCountResponse
	analyticsUnique: AnalyticsUniqueResponse
	analyticsUniqueCount: AnalyticsUniqueCountResponse
	files: FilesResponse
	photos: PhotosResponse
	postTags: PostTagsResponse
	posts: PostsResponse
	postsCount: PostsCountResponse
	postsDeleted: PostsDeletedResponse
	postsDraft: PostsDraftResponse
	tags: TagsResponse
	tournaments: TournamentsResponse
	users: UsersResponse
	years: YearsResponse
}