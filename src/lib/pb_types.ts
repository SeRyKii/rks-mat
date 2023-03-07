/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Analytics = "analytics",
	AnalyticsCount = "analyticsCount",
	AnalyticsUnique = "analyticsUnique",
	AnalyticsUniqueCount = "analyticsUniqueCount",
	Posts = "posts",
	PostsCount = "postsCount",
	PostsDeleted = "postsDeleted",
	PostsDraft = "postsDraft",
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

export type PostsRecord = {
	title?: string
	description?: HTMLString
	type?: number
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

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AnalyticsResponse = AnalyticsRecord & BaseSystemFields
export type AnalyticsCountResponse = AnalyticsCountRecord & BaseSystemFields
export type AnalyticsUniqueResponse = AnalyticsUniqueRecord & BaseSystemFields
export type AnalyticsUniqueCountResponse = AnalyticsUniqueCountRecord & BaseSystemFields
export type PostsResponse = PostsRecord & BaseSystemFields
export type PostsCountResponse = PostsCountRecord & BaseSystemFields
export type PostsDeletedResponse = PostsDeletedRecord & BaseSystemFields
export type PostsDraftResponse = PostsDraftRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	analytics: AnalyticsRecord
	analyticsCount: AnalyticsCountRecord
	analyticsUnique: AnalyticsUniqueRecord
	analyticsUniqueCount: AnalyticsUniqueCountRecord
	posts: PostsRecord
	postsCount: PostsCountRecord
	postsDeleted: PostsDeletedRecord
	postsDraft: PostsDraftRecord
	users: UsersRecord
}

export type CollectionResponses = {
	analytics: AnalyticsResponse
	analyticsCount: AnalyticsCountResponse
	analyticsUnique: AnalyticsUniqueResponse
	analyticsUniqueCount: AnalyticsUniqueCountResponse
	posts: PostsResponse
	postsCount: PostsCountResponse
	postsDeleted: PostsDeletedResponse
	postsDraft: PostsDraftResponse
	users: UsersResponse
}