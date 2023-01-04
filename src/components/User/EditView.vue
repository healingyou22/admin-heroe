<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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
        let data = reactive({
            name: "",
            email: "",
            whatsapp_num: "",
            role: "",
        });

        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios
                .get(`http://127.0.0.1:8080/api/users/${route.params.id}`)
                .then((result) => {
                    data.name = result.data.data.name;
                    data.email = result.data.data.email;
                    data.whatsapp_num = result.data.data.whatsapp_num;
                    data.role = result.data.data.role;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        function update() {
            axios
                .put(`http://127.0.0.1:8080/api/users/${route.params.id}`, data)
                .then((result) => {
                    const $toast = useToast();
                    let instance = $toast.success("User Updated.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    router.push({
                        name: "user.index",
                    });
                })
                .catch((err) => {
                    validation.value = err.response.data;
                });
        }

        return {
            data,
            validation,
            router,
            route,
            update,
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
                        <h4 class="mb-3">User Edit</h4>
                        <form
                            class="needs-validation"
                            novalidate
                            @submit.prevent="update()"
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
                                        v-model="data.name"
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
                                        v-model="data.whatsapp_num"
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
                                        v-model="data.email"
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
                                        v-model="data.role"
                                    >
                                        <option selected disabled value="">
                                            Choose...
                                        </option>
                                        <option>administrator</option>
                                        <option>karyawan</option>
                                        <option>klien</option>
                                    </select>
                                    <div
                                        v-if="validation.email"
                                        class="text-danger"
                                    >
                                        {{ validation.email[0] }} . Please
                                        provide a valid role.
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