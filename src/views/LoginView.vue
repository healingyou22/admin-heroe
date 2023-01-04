<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const router = useRouter();

        const user = reactive({
            email: "",
            password: "",
        });

        const validation = ref([]);

        const loginFailed = ref(null);

        function login() {
            let email = user.email;
            let password = user.password;

            axios
                .post("http://127.0.0.1:8080/api/login", {
                    email,
                    password,
                })
                .then((response) => {
                    if (response.data.success) {
                        let user = response.data;
                        let role = user.role;

                        localStorage.setItem("data", JSON.stringify(user));
                        localStorage.setItem("token", response.data.token);

                        if (role !== "klien") {
                            return router.push({
                                name: "home",
                            });
                        }

                        loginFailed.value = true;
                    }
                })
                .catch((error) => {
                    validation.value = error.response;
                });
        }

        return {
            user,
            validation,
            router,
            loginFailed,
            login,
        };
    },
};
</script>

<template>
    <section class="vh-100" style="background-color: #616161">
        <div class="container py-5 h-100">
            <div
                class="
                    row
                    d-flex
                    justify-content-center
                    align-items-center
                    h-100
                "
            >
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div
                        class="card shadow-2-strong"
                        style="border-radius: 1rem"
                    >
                        <div v-if="loginFailed" class="alert alert-danger">
                            Email atau Password Anda salah.
                        </div>
                        <div class="card-body p-5">
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label
                                        for="exampleInputEmail1"
                                        class="form-label"
                                        >Email address</label
                                    >
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        v-model="user.email"
                                    />
                                    <div id="emailHelp" class="form-text">
                                        We'll never share your email with anyone
                                        else.
                                    </div>
                                </div>
                                <div
                                    v-if="validation.email"
                                    class="mt-2 alert alert-danger"
                                >
                                    {{ validation.email[0] }}
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="exampleInputPassword1"
                                        class="form-label"
                                        >Password</label
                                    >
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        v-model="user.password"
                                    />
                                </div>
                                <div
                                    v-if="validation.password"
                                    class="mt-2 alert alert-danger"
                                >
                                    {{ validation.password[0] }}
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>