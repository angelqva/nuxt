<template>
	<div class="container position-sticky z-index-sticky top-0">
		<div class="row">
			<div class="col-12">
				<nav
					class="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4"
				>
					<div class="container-fluid px-1">
						<NuxtLink
							to="/"
							class="navbar-brand font-weight-bolder ms-lg-0"
						>
							Website Full Name
						</NuxtLink>
						<button
							ref="toggleMenu"
							class="navbar-toggler shadow-none ms-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navigation"
							aria-controls="navigation"
							aria-expanded="false"
							aria-label="Toggle navigation"
							v-click-outside="outsideToggleMenu"
						>
							<span class="navbar-toggler-icon mt-2">
								<span class="navbar-toggler-bar bar1"></span>
								<span class="navbar-toggler-bar bar2"></span>
								<span class="navbar-toggler-bar bar3"></span>
							</span>
						</button>
						<div class="collapse navbar-collapse" id="navigation">
							<ul class="navbar-nav mx-auto ms-xl-auto">
								<li class="nav-item">
									<NuxtLink
										:class="classLink"
										to="/dashboard"
									>
										<i class="fa fa-dashboard pe-2"></i>
										Dashboard
									</NuxtLink>
								</li>
								<li class="nav-item">
									<NuxtLink
										:class="classLink"
										to="/registrarse"
									>
										<i class="fa fa-address-card pe-2"></i>
										Registrarse
									</NuxtLink>
								</li>
								<li class="nav-item">
									<NuxtLink
										:class="classLink"
										to="/autenticarse"
									>
										<i class="fa fa-fingerprint pe-2"></i>
										Autenticarse
									</NuxtLink>
								</li>
							</ul>
							<ul class="navbar-nav d-lg-block d-none">
								<li class="nav-item">
									<NuxtLink
										to="/"
										class="btn btn-sm mb-0 bg-gradient-dark"
									>
										Accion a Realizar
									</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const classLink: string =
		"nav-link d-flex align-items-center me-2 p-3 p-md-2";
	const toggleMenu = ref<HTMLButtonElement | null>(null);
	const outsideToggleMenu = () => {
		if (toggleMenu !== null) {
			let element: HTMLButtonElement = toggleMenu.value;
			if (element.getAttribute("aria-expanded") === "true") {
				setTimeout(() => {
					element.click();
				}, 50);
			}
		}
	};
</script>
<style scoped>
	.router-link-exact-active {
		color: #1e293b !important;
		font-weight: 700 !important;
	}
	.router-link-exact-active.btn {
		color: #fff !important;
	}
</style>
