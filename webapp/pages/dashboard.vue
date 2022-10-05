<template>
	<NuxtLayout :name="layout">
		<h1 class="position-absolute top-10 text-center w-100">
			Dashboard Page
		</h1>
	</NuxtLayout>
</template>
<style scoped></style>
<script setup lang="ts">
	const layout: string = "home";
</script>
