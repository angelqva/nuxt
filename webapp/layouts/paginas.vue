<script setup></script>

<template>
	<div class="has-background-primary has-text-dark">
		<header>
			<h1>Header</h1>
			<slot name="header">Fallback header content</slot>
		</header>
		<main>
			<h1>Main</h1>
			<slot>Fallback main content</slot>
		</main>
		<footer class="has-background-link">
			<h1>Footer</h1>
			<slot name="footer">Fallback footer content</slot>
		</footer>
	</div>
</template>

<style scoped></style>
