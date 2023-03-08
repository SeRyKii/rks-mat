/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Analytics = "analytics",
	Posts = "posts",
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

export type PostsRecord = {
	title?: string
	type?: number
	content?: HTMLString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AnalyticsResponse = AnalyticsRecord & BaseSystemFields
export type PostsResponse = PostsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	analytics: AnalyticsRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	analytics: AnalyticsResponse
	posts: PostsResponse
	users: UsersResponse
}