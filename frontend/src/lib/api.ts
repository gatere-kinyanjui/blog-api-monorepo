export interface IUser {
	id: number;
	email: string;
	password: string;
	userName: string;
	posts: IPost[];
	created_at: Date;
	updated_at: Date;
}

export interface IPost {
	id: number;
	title: string;
	content: string;
	published: boolean;
	author?: string;
	author_id: number;
	created_at: Date;
	updated_at: Date;
	Comment?: IComment[];
}

export interface IComment {
	id: number;
	content: string;
	post: IPost;
	post_id: number;
}

export async function fetchPosts(): Promise<IPost[]> {
	const res = await fetch('/posts');
	if (!res.ok) throw new Error('Error fetching posts.');
	return res.json();
}

export async function fetchUsers(): Promise<IUser[]> {
	const res = await fetch('/');

	return res.json();
}
export async function fetchComments(): Promise<IComment[]> {
	const res = await fetch('/');

	return res.json();
}
