<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
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
        let pricings = ref([]);

        onMounted(() => {
            axios
                .get("http://127.0.0.1:8080/api/pricings")
                .then((result) => {
                    pricings.value = result.data.data;
                })
                .catch((err) => {
                    err.response;
                });
        });

        function getPricingPrice() {
            let pricing_id = order.pricing_id;
            axios
                .get(`http://127.0.0.1:8080/api/pricings/${pricing_id}`)
                .then((result) => {
                    order.total_price = result.data.data.pricing_price;
                    order.pricing_name = result.data.data.pricing_name;
                    order.pricing_type = result.data.data.pricing_type;
                })
                .catch((err) => {
                    err.response;
                });
        }

        const order = reactive({
            full_name: "",
            address: "",
            whatsapp_num: "",
            date: "",
            location: "",
            pricing_id: "",
            total_price: "",
        });

        const validation = ref([]);

        const router = useRouter();

        function store() {
            let full_name = order.full_name;
            let address = order.address;
            let whatsapp_num = order.whatsapp_num;
            let date = order.date;
            let location = order.location;
            let total_price = order.total_price;
            let pricing_id = order.pricing_id;

            axios
                .post("http://127.0.0.1:8080/api/orders", {
                    full_name,
                    address,
                    whatsapp_num,
                    date,
                    location,
                    total_price,
                    pricing_id,
                })
                .then((result) => {
                    const $toast = useToast();
                    let instance = $toast.success("New Order Created.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    return router.push({ name: "order.index" });
                })
                .catch((err) => {
                    validation.value = err.response.data;
                });
        }

        return {
            store,
            order,
            validation,
            router,
            getPricingPrice,
            pricings,
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
                        <div class="row g-5">
                            <div class="col-md-5 col-lg-4 order-md-last">
                                <h4
                                    class="
                                        d-flex
                                        justify-content-between
                                        align-items-center
                                        mb-3
                                    "
                                >
                                    <span class="text-primary">Cart</span>
                                    <span
                                        class="badge bg-primary rounded-pill"
                                    ></span>
                                </h4>
                                <ul class="list-group mb-3">
                                    <li
                                        class="
                                            list-group-item
                                            d-flex
                                            justify-content-between
                                            lh-sm
                                        "
                                    >
                                        <div>
                                            <h6 class="my-0">
                                                {{ order.pricing_name }}
                                            </h6>
                                            <small class="text-muted">{{
                                                order.pricing_type
                                            }}</small>
                                        </div>
                                        <span class="text-muted"
                                            >Rp {{ order.total_price }}</span
                                        >
                                    </li>

                                    <li
                                        class="
                                            list-group-item
                                            d-flex
                                            justify-content-between
                                        "
                                    >
                                        <span>Total (Rp)</span>
                                        <strong>{{ order.total_price }}</strong>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-7 col-lg-8">
                                <h4 class="mb-3">Billing address</h4>
                                <form
                                    class="needs-validation"
                                    novalidate
                                    @submit.prevent="store"
                                >
                                    <div class="row g-3">
                                        <div class="col-sm-6">
                                            <label for="Name" class="form-label"
                                                >Name</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="Name"
                                                placeholder=""
                                                required
                                                v-model="order.full_name"
                                            />
                                            <div
                                                class="text-danger"
                                                v-if="validation.full_name"
                                            >
                                                {{ validation.full_name[0] }}
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <label
                                                for="WhatsApp"
                                                class="form-label"
                                                >WhatsApp Number</label
                                            >
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="WhatsApp"
                                                required
                                                v-model="order.whatsapp_num"
                                            />
                                            <div
                                                class="text-danger"
                                                v-if="validation.whatsapp_num"
                                            >
                                                {{ validation.whatsapp_num[0] }}
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label
                                                for="address"
                                                class="form-label"
                                                >Address</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="address"
                                                placeholder="1234 Main St"
                                                required
                                                v-model="order.address"
                                            />
                                            <div
                                                class="text-danger"
                                                v-if="validation.address"
                                            >
                                                {{ validation.address[0] }}
                                            </div>
                                        </div>
                                        <h4 class="mb-3">Event Information</h4>
                                        <div class="col-12">
                                            <label
                                                for="venue"
                                                class="form-label"
                                                >Venue
                                                <span class="text-muted"
                                                    >(Optional)</span
                                                ></label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="venue"
                                                placeholder="Apartment or suite"
                                                v-model="order.location"
                                            />
                                            <div
                                                class="text-danger"
                                                v-if="validation.location"
                                            >
                                                {{ validation.location[0] }}
                                            </div>
                                        </div>

                                        <div class="col-md-5">
                                            <label for="date" class="form-label"
                                                >Date</label
                                            >
                                            <input
                                                type="date"
                                                class="form-control"
                                                id="date"
                                                v-model="order.date"
                                            />
                                            <div
                                                class="text-danger"
                                                v-if="validation.date"
                                            >
                                                {{ validation.date[0] }}
                                            </div>
                                        </div>

                                        <div class="col-md-7">
                                            <label
                                                for="pricing"
                                                class="form-label"
                                                >Pricing</label
                                            >
                                            <select
                                                class="form-select"
                                                id="pricing"
                                                required
                                                v-model="order.pricing_id"
                                                @change="getPricingPrice()"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                    hidden
                                                >
                                                    Choose...
                                                </option>
                                                <option
                                                    v-for="(
                                                        pricing, index
                                                    ) in pricings"
                                                    :key="index"
                                                    :value="pricing.id"
                                                >
                                                    {{ pricing.pricing_name }}
                                                </option>
                                            </select>
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
                                            :to="{ name: 'order.index' }"
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
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>