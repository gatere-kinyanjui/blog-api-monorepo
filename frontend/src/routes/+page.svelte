<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchPosts, type IPost } from '$lib/api';

	let posts: IPost[] = [];

	onMount(async () => {
		try {
			posts = await fetchPosts();
		} catch (error: any) {
			console.error('Error mounting posts: ', error);
		}
	});
</script>

<h1>Blog Posts</h1>
{#each posts as post}
	<div>
		<h2>
			{post.title}
		</h2>
		<h4>{post.author}</h4>
		<h5>{post.created_at}</h5>
		<p>{post.content}</p>
	</div>
{/each}

<style>
	h1 {
		color: #ff3e00;
	}
</style>
