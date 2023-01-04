<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        let reports = ref([]);

        let data = reactive({
            name: "",
            address: "",
            whatsapp_num: "",
            date: "",
            location: "",
            payment_status: "",
            total_price: "",
            unicode: "",
            order_status: "",
        });

        const router = useRouter();

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/reports")
                .then((result) => {
                    reports.value = result.data.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        function getId(id) {
            axios
                .get(`http://127.0.0.1:8080/api/reports/${id}`)
                .then((result) => {
                    data.name = result.data.data.name;
                    data.address = result.data.data.address;
                    data.whatsapp_num = result.data.data.whatsapp_num;
                    data.date = result.data.data.date;
                    data.location = result.data.data.location;
                    data.payment_status = result.data.data.payment_status;
                    data.total_price = result.data.data.total_price;
                    data.unicode = result.data.data.unicode;
                    data.order_status = result.data.data.order_status;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        return {
            reports,
            getId,
            data,
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
                    <h1 class="h2">Report Management</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                            >
                                Share
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                            >
                                Export
                            </button>
                        </div>
                        <button
                            type="button"
                            class="
                                btn btn-sm btn-outline-secondary
                                dropdown-toggle
                            "
                        >
                            <!-- <span
                        data-feather="calendar"
                        class="align-text-bottom"
                    ></span> -->
                            <span class="align-text-bottom"
                                ><img src="/icons/calendar.svg" alt=""
                            /></span>
                            This week
                        </button>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report, index) in reports" :key="index">
                                <td>{{ report.name }}</td>
                                <td>{{ report.date }}</td>
                                <td>{{ report.payment_status }}</td>
                                <td>{{ report.order_status }}</td>
                                <td>
                                    <!-- Button trigger modal -->
                                    <button
                                        type="button"
                                        class="btn btn-info btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        @click="getId(report.id)"
                                    >
                                        Detail
                                    </button>
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
                                        <label
                                            for="validationCustom01"
                                            class="form-label"
                                            >Name</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom01"
                                            required
                                            v-model="data.name"
                                        />
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label
                                            for="validationCustom04"
                                            class="form-label"
                                            >address</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            v-model="data.address"
                                        />
                                    </div>
                                    <div class="col-md-7">
                                        <label
                                            for="validationCustom05"
                                            class="form-label"
                                            >WhatsApp</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom05"
                                            required
                                            v-model="data.whatsapp_num"
                                        />
                                        <div class="invalid-feedback">
                                            Please provide a valid description.
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Date</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            required
                                            v-model="data.date"
                                        />
                                        <div class="invalid-feedback">
                                            Please provide a valid price.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Location</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.location"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Payment Status</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.payment_status"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Unicode</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.unicode"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Order Status</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.order_status"
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