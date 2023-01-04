<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        let users = ref([]);

        let data = reactive({
            id: "",
            name: "",
            email: "",
            whatsapp_num: "",
            role: "",
        });

        const router = useRouter();

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/users")
                .then((result) => {
                    users.value = result.data.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        function getId(id) {
            axios
                .get(`http://127.0.0.1:8080/api/users/${id}`)
                .then((result) => {
                    data.id = result.data.data.id;
                    data.name = result.data.data.name;
                    data.email = result.data.data.email;
                    data.whatsapp_num = result.data.data.whatsapp_num;
                    data.role = result.data.data.role;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        function destroy(id, index) {
            axios
                .delete(`http://127.0.0.1:8080/api/users/${id}`)
                .then((result) => {
                    users.value.splice(index, 1);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        return {
            users,
            getId,
            destroy,
            router,
            data,
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
                    <h1 class="h2">User Management</h1>

                    <div class="btn-toolbar mb-2 mb-md-0">
                        <router-link
                            :to="{ name: 'user.create' }"
                            type="button"
                            class="btn btn-sm btn-outline-primary"
                        >
                            <span class="align-text-bottom"
                                ><img src="/icons/file-plus.svg" alt=""
                            /></span>
                            Create
                        </router-link>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Whatsapp</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.whatsapp_num }}</td>
                                <td>{{ user.role }}</td>
                                <td>
                                    <div
                                        class="btn-group"
                                        role="group"
                                        aria-label="Basic mixed styles example"
                                    >
                                        <router-link
                                            :to="{
                                                name: 'user.edit',
                                                params: { id: user.id },
                                            }"
                                            type="button"
                                            class="btn btn-success btn-sm"
                                        >
                                            Edit
                                        </router-link>
                                        <button
                                            type="button"
                                            class="btn btn-info btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            @click="getId(user.id)"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            @click="destroy(user.id, index)"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Modal -->
                <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div
                        class="
                            modal-dialog
                            modal-dialog-centered
                            modal-dialog-scrollable
                            modal-lg
                        "
                    >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1
                                    class="modal-title fs-5"
                                    id="staticBackdropLabel"
                                >
                                    Detail
                                </h1>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <form
                                    class="row g-3 needs-validation"
                                    novalidate
                                >
                                    <div class="col-md-8">
                                        <label class="form-label">Name</label>
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            required
                                            v-model="data.name"
                                        />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Role</label>
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            required
                                            v-model="data.role"
                                        />
                                    </div>
                                    <div class="col-md-7">
                                        <label class="form-label">Email</label>
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            required
                                            v-model="data.email"
                                        />
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label"
                                            >WhatsApp</label
                                        >
                                        <input
                                            readonly
                                            type="number"
                                            class="form-control"
                                            required
                                            v-model="data.whatsapp_num"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>