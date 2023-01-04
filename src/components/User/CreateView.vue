<script>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "../Header.vue";
import Navbar from "../Navbar.vue";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        const user = reactive({
            name: "",
            email: "",
            whatsapp_num: "",
            role: "",
            password: "",
            password_confirmation: "",
        });

        const validation = ref([]);

        const router = useRouter();

        function store() {
            let name = user.name;
            let email = user.email;
            let whatsapp_num = user.whatsapp_num;
            let role = user.role;
            let password = user.password;
            let password_confirmation = user.password_confirmation;

            axios
                .post("http://127.0.0.1:8080/api/users", {
                    name,
                    email,
                    whatsapp_num,
                    role,
                    password,
                    password_confirmation,
                })
                .then((result) => {
                    const $toast = useToast();
                    let instance = $toast.success("New User Created.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    return router.push({ name: "user.index" });
                })
                .catch((err) => {
                    validation.value = err.response.data;
                });
        }

        return {
            store,
            user,
            validation,
            router,
        };
    },
};
</script>
<template>
    <Header />

    <div class="container-fluid">
        <div class="row">
            <Navbar />

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    class="
                        d-flex
                        justify-content-between
                        flex-wrap flex-md-nowrap
                        align-items-center
                        pt-3
                        pb-2
                        mb-3
                        border-bottom
                    "
                >
                    <div class="col-lg">
                        <h4 class="mb-3">User Create</h4>
                        <form
                            class="needs-validation"
                            novalidate
                            @submit.prevent="store()"
                        >
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <label for="name" class="form-label"
                                        >Full Name</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        placeholder=""
                                        required
                                        v-model="user.name"
                                    />
                                    <div
                                        v-if="validation.name"
                                        class="text-danger"
                                    >
                                        {{ validation.name[0] }} . Valid name is
                                        required.
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <label for="whatsapp_num" class="form-label"
                                        >WhatsApp Number</label
                                    >
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="whatsapp_num"
                                        placeholder=""
                                        required
                                        v-model="user.whatsapp_num"
                                    />
                                    <div
                                        v-if="validation.whatsapp_num"
                                        class="text-danger"
                                    >
                                        {{ validation.whatsapp_num[0] }} . Valid
                                        whatsapp number is required.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="email" class="form-label"
                                        >Email
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="you@example.com"
                                        v-model="user.email"
                                    />
                                    <div
                                        v-if="validation.email"
                                        class="text-danger"
                                    >
                                        {{ validation.email[0] }} . Please enter
                                        a valid email address for shipping
                                        updates.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="role" class="form-label"
                                        >Role</label
                                    >
                                    <select
                                        class="form-select"
                                        id="role"
                                        required
                                        v-model="user.role"
                                    >
                                        <option selected disabled value="">
                                            Choose...
                                        </option>
                                        <option>administrator</option>
                                        <option>karyawan</option>
                                        <option>klien</option>
                                    </select>
                                    <div
                                        v-if="validation.role"
                                        class="text-danger"
                                    >
                                        {{ validation.role[0] }} . Please
                                        provide a valid role.
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="password" class="form-label"
                                        >Password</label
                                    >
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        placeholder=""
                                        required
                                        v-model="user.password"
                                    />
                                    <div
                                        v-if="validation.password"
                                        class="text-danger"
                                    >
                                        {{ validation.password[0] }} . Valid
                                        password is required.
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label
                                        for="password_confirmation"
                                        class="form-label"
                                        >Re-enter Password</label
                                    >
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password_confirmation"
                                        placeholder=""
                                        required
                                        v-model="user.password_confirmation"
                                    />
                                    <small class="text-muted"
                                        >Please re-enter your password</small
                                    >
                                    <div
                                        v-if="validation.password_confirmation"
                                        class="text-danger"
                                    >
                                        {{
                                            validation.password_confirmation[0]
                                        }}
                                        . Password must be same as before.
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4" />

                            <div
                                class="
                                    d-grid
                                    gap-2
                                    d-md-flex
                                    justify-content-md-end
                                "
                            >
                                <router-link
                                    :to="{ name: 'user.index' }"
                                    class="btn btn-danger"
                                    type="button"
                                >
                                    Back
                                </router-link>
                                <button
                                    class="btn btn-primary me-md-2"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>