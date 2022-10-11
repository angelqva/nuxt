<template>
	<NuxtPage />
</template>
<style>
	body {
		background-color: rgba(216, 216, 216, 0.452);
	}
	.form-control.is-invalid:hover:focus {
		border-color: #ea4e3d !important;
	}
	.form-control.is-invalid:hover {
		border-color: #ea4e3d !important;
	}
	.form-control.is-valid:hover:focus {
		border-color: #66d432 !important;
	}
	.form-control.is-valid:hover {
		border-color: #66d432 !important;
	}
</style>
<script setup>
	useHead({
		viewport: "width=device-width, initial-scale=1, maximum-scale=1",
		charset: "utf-8",
		link: {
			rel: "apple-touch-icon",
			sizes: "76x76",
			href: "/assets/img/apple-icon.png",
		},
		link: {
			rel: "icon",
			type: "image/png",
			href: "/assets/img/favicon.png",
		},
		script: {
			type: "text/javascript",
			src: "/assets/js/core/popper.min.js",
		},
		script: {
			type: "text/javascript",
			src: "/assets/js/core/bootstrap.min.js",
		},
	});
</script>
