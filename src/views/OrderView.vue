<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        const router = useRouter();

        let orders = ref([]);

        let data = reactive({
            full_name: "",
            address: "",
            whatsapp_num: "",
            date: "",
            location: "",
            payment_status: "",
            total_price: "",
            unicode: "",
            order_status: "",
            pricing_name: "",
            pricing_type: "",
        });

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/orders")
                .then((result) => {
                    orders.value = result.data.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        function getId(id) {
            axios
                .get(`http://127.0.0.1:8080/api/orders/${id}`)
                .then((result) => {
                    data.full_name = result.data.data.full_name;
                    data.address = result.data.data.address;
                    data.date = result.data.data.date;
                    data.location = result.data.data.location;
                    data.order_status = result.data.data.order_status;
                    data.payment_status = result.data.data.payment_status;
                    data.pricing_type = result.data.data.pricing.pricing_type;
                    data.pricing_name = result.data.data.pricing.pricing_name;
                    data.total_price = result.data.data.total_price;
                    data.unicode = result.data.data.unicode;
                    data.whatsapp_num = result.data.data.whatsapp_num;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        function cancel(id) {
            axios
                .get(`http://127.0.0.1:8080/api/orders-cancel/${id}`)
                .then((result) => {
                    console.log(result);
                    return router.push({
                        name: "report.index",
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        function remind(id) {
            axios
                .post("http://127.0.0.1/api/reminder/whatsapp-notification", {
                    id,
                })
                .then((result) => {
                    console.log(result);
                    return this.$router.go();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        return {
            router,
            orders,
            data,
            getId,
            cancel,
            remind,
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
                    <h1 class="h2">Order Management</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <router-link
                                :to="{ name: 'order.create' }"
                                class="btn btn-sm btn-outline-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop-create"
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
                    <table class="table table-striped table-sm text-center">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Pricing Type</th>
                                <th scope="col">Pricing Name</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, index) in orders" :key="index">
                                <td>{{ order.date }}</td>
                                <td>{{ order.full_name }}</td>
                                <td>{{ order.pricing.pricing_type }}</td>
                                <td>{{ order.pricing.pricing_name }}</td>
                                <td>{{ order.payment_status }}</td>
                                <td>{{ order.order_status }}</td>
                                <td>
                                    <div
                                        class="btn-group"
                                        role="group"
                                        aria-label="Basic mixed styles example"
                                    >
                                        <button
                                            v-if="
                                                order.order_status !==
                                                    'Canceled' &&
                                                order.order_status !==
                                                    'Finished'
                                            "
                                            type="button"
                                            class="btn btn-warning btn-sm"
                                            @click="remind(order.id)"
                                        >
                                            Remind
                                        </button>
                                        <!-- Button trigger modal -->
                                        <button
                                            type="button"
                                            class="btn btn-info btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            @click="getId(order.id)"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            v-if="
                                                order.order_status !==
                                                    'Canceled' &&
                                                order.order_status !==
                                                    'Finished' &&
                                                order.order_status !==
                                                    'On Working'
                                            "
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            @click="cancel(order.id)"
                                        >
                                            Cancel
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
                                            v-model="data.full_name"
                                        />
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
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Pricing Type</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.pricing_type"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            for="validationCustom03"
                                            class="form-label"
                                            >Pricing Name</label
                                        >
                                        <input
                                            readonly
                                            type="text"
                                            class="form-control"
                                            id="validationCustom03"
                                            v-model="data.pricing_name"
                                        />
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