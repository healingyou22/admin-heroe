<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const token = localStorage.getItem("token");

        const router = useRouter();

        const user = ref("");

        onMounted(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios
                .get("http://127.0.0.1:8080/api/user")
                .then((response) => {
                    user.value = response.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function logout() {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios
                .post("http://127.0.0.1:8080/api/logout")
                .then((response) => {
                    if (response.data.success) {
                        window.localStorage.clear();

                        return router.push({
                            name: "login",
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        return {
            token,
            user,
            logout,
        };
    },
};
</script>

<template>
    <header
        class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/"
            >Heroe Photography</a
        >
        <button
            class="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <input
            class="form-control form-control-dark w-100 rounded-0 border-0"
            type="text"
            placeholder="Search"
            aria-label="Search"
        />
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a
                    class="nav-link px-3"
                    @click.prevent="logout"
                    style="cursor: pointer"
                    >Sign out</a
                >
            </div>
        </div>
    </header>
</template>