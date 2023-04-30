/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Achievements = "achievements",
	Analytics = "analytics",
	AnalyticsCount = "analyticsCount",
	AnalyticsUnique = "analyticsUnique",
	AnalyticsUniqueCount = "analyticsUniqueCount",
	Files = "files",
	Posts = "posts",
	PostsCount = "postsCount",
	PostsDeleted = "postsDeleted",
	PostsDraft = "postsDraft",
	Tournaments = "tournaments",
	Users = "users",
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

export type AnalyticsUniqueRecord = {

}

export type AnalyticsUniqueCountRecord = {
	nth?: number
}

export type FilesRecord = {
	file?: string
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

// Response types include system fields and match responses from the PocketBase API
export type AchievementsResponse<Texpand = unknown> = AchievementsRecord & BaseSystemFields<Texpand>
export type AnalyticsResponse = AnalyticsRecord & BaseSystemFields
export type AnalyticsCountResponse = AnalyticsCountRecord & BaseSystemFields
export type AnalyticsUniqueResponse = AnalyticsUniqueRecord & BaseSystemFields
export type AnalyticsUniqueCountResponse = AnalyticsUniqueCountRecord & BaseSystemFields
export type FilesResponse = FilesRecord & BaseSystemFields
export type PostsResponse<Tcontent = unknown, Texpand = unknown> = PostsRecord<Tcontent> & BaseSystemFields<Texpand>
export type PostsCountResponse = PostsCountRecord & BaseSystemFields
export type PostsDeletedResponse = PostsDeletedRecord & BaseSystemFields
export type PostsDraftResponse = PostsDraftRecord & BaseSystemFields
export type TournamentsResponse = TournamentsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	achievements: AchievementsRecord
	analytics: AnalyticsRecord
	analyticsCount: AnalyticsCountRecord
	analyticsUnique: AnalyticsUniqueRecord
	analyticsUniqueCount: AnalyticsUniqueCountRecord
	files: FilesRecord
	posts: PostsRecord
	postsCount: PostsCountRecord
	postsDeleted: PostsDeletedRecord
	postsDraft: PostsDraftRecord
	tournaments: TournamentsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	achievements: AchievementsResponse
	analytics: AnalyticsResponse
	analyticsCount: AnalyticsCountResponse
	analyticsUnique: AnalyticsUniqueResponse
	analyticsUniqueCount: AnalyticsUniqueCountResponse
	files: FilesResponse
	posts: PostsResponse
	postsCount: PostsCountResponse
	postsDeleted: PostsDeletedResponse
	postsDraft: PostsDraftResponse
	tournaments: TournamentsResponse
	users: UsersResponse
}