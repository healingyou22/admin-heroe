<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        let pricings = ref([]);

        let data = reactive({
            id: "",
            pricing_name: "",
            pricing_type: "",
            pricing_desc: "",
            pricing_detail_1: "",
            pricing_detail_2: "",
            pricing_detail_3: "",
            pricing_detail_4: "",
            pricing_detail_5: "",
            pricing_detail_6: "",
            pricing_detail_7: "",
            pricing_detail_8: "",
            pricing_detail_9: "",
            pricing_detail_10: "",
            pricing_price: "",
        });

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/pricings")
                .then((result) => {
                    pricings.value = result.data.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        function getId(id) {
            axios
                .get(`http://127.0.0.1:8080/api/pricings/${id}`)
                .then((result) => {
                    data.id = result.data.data.id;
                    data.pricing_name = result.data.data.pricing_name;
                    data.pricing_type = result.data.data.pricing_type;
                    data.pricing_desc = result.data.data.pricing_desc;
                    data.pricing_detail_1 = result.data.data.pricing_detail_1;
                    data.pricing_detail_2 = result.data.data.pricing_detail_2;
                    data.pricing_detail_3 = result.data.data.pricing_detail_3;
                    data.pricing_detail_4 = result.data.data.pricing_detail_4;
                    data.pricing_detail_5 = result.data.data.pricing_detail_5;
                    data.pricing_detail_6 = result.data.data.pricing_detail_6;
                    data.pricing_detail_7 = result.data.data.pricing_detail_7;
                    data.pricing_detail_8 = result.data.data.pricing_detail_8;
                    data.pricing_detail_9 = result.data.data.pricing_detail_9;
                    data.pricing_detail_10 = result.data.data.pricing_detail_10;
                    data.pricing_price = result.data.data.pricing_price;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        function destroy(id, index) {
            axios
                .delete(`http://127.0.0.1:8080/api/pricings/${id}`)
                .then((result) => {
                    pricings.value.splice(index, 1);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        return {
            pricings,
            getId,
            destroy,
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
                    <h1 class="h2">Pricing Management</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <router-link
                                :to="{ name: 'pricing.create' }"
                                class="btn btn-sm btn-outline-primary"
                            >
                                <span class="align-text-bottom"
                                    ><img src="/icons/file-plus.svg" alt=""
                                /></span>
                                Create
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(pricing, index) in pricings"
                                :key="index"
                            >
                                <td>{{ pricing.pricing_name }}</td>
                                <td>{{ pricing.pricing_type }}</td>
                                <td>{{ pricing.pricing_desc }}</td>
                                <td>{{ pricing.pricing_price }}</td>
                                <td>
                                    <div
                                        class="btn-group"
                                        role="group"
                                        aria-label="Basic mixed styles example"
                                    >
                                        <router-link
                                            :to="{
                                                name: 'pricing.edit',
                                                params: {
                                                    id: pricing.id,
                                                },
                                            }"
                                            class="btn btn-success btn-sm"
                                            @click="getId(pricing.id)"
                                        >
                                            Edit
                                        </router-link>
                                        <!-- Button trigger modal -->
                                        <button
                                            type="button"
                                            class="btn btn-info btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            @click="getId(pricing.id)"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            @click="destroy(pricing.id, index)"
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
                                    @submit.prevent="update(data.id)"
                                >
                                    <div class="col-md-8">
                                        <label
                                            for="validationCustom01"
                                            class="form-label"
                                            >Name</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            required
                                            v-model="data.pricing_name"
                                        />
                                    </div>
                                    <div class="col-md-4">
                                        <label
                                            for="validationCustom04"
                                            class="form-label"
                                            >Type</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_type"
                                        />
                                    </div>
                                    <div class="col-md-7">
                                        <label
                                            for="validationCustom05"
                                            class="form-label"
                                            >Description</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            required
                                            v-model="data.pricing_desc"
                                        />
                                    </div>
                                    <div class="col-md-5">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Price</label
                                        >
                                        <input
                                            readonly
                                            type="number"
                                            class="form-control"
                                            required
                                            v-model="data.pricing_price"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 1</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_1"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 2</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_2"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 3</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_3"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 4</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_4"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 5</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_5"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 6</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_6"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 7</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_7"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 8</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_8"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 9</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_9"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Detail 10</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.pricing_detail_10"
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