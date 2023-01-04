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
        const pricing = reactive({
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

        const validation = ref([]);

        const router = useRouter();

        function store() {
            let pricing_name = pricing.pricing_name;
            let pricing_type = pricing.pricing_type;
            let pricing_desc = pricing.pricing_desc;
            let pricing_price = pricing.pricing_price;
            let pricing_detail_1 = pricing.pricing_detail_1;
            let pricing_detail_2 = pricing.pricing_detail_2;
            let pricing_detail_3 = pricing.pricing_detail_3;
            let pricing_detail_4 = pricing.pricing_detail_4;
            let pricing_detail_5 = pricing.pricing_detail_5;
            let pricing_detail_6 = pricing.pricing_detail_6;
            let pricing_detail_7 = pricing.pricing_detail_7;
            let pricing_detail_8 = pricing.pricing_detail_8;
            let pricing_detail_9 = pricing.pricing_detail_9;
            let pricing_detail_10 = pricing.pricing_detail_10;

            axios
                .post("http://127.0.0.1:8080/api/pricings", {
                    pricing_name,
                    pricing_type,
                    pricing_desc,
                    pricing_price,
                    pricing_detail_1,
                    pricing_detail_2,
                    pricing_detail_3,
                    pricing_detail_4,
                    pricing_detail_5,
                    pricing_detail_6,
                    pricing_detail_7,
                    pricing_detail_8,
                    pricing_detail_9,
                    pricing_detail_10,
                })
                .then((result) => {
                    const $toast = useToast();
                    let instance = $toast.success("New Pricing Created.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    return router.push({
                        name: "pricing.index",
                    });
                })
                .catch((err) => {
                    validation.value = err.response.data;
                });
        }

        return {
            pricing,
            validation,
            router,
            store,
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
                        <h4 class="mb-3">Pricing Create</h4>
                        <form
                            class="needs-validation"
                            novalidate
                            @submit.prevent="store()"
                        >
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <label for="pricing_name" class="form-label"
                                        >Name</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="pricing_name"
                                        placeholder=""
                                        required
                                        v-model="pricing.pricing_name"
                                    />
                                    <div
                                        v-if="validation.pricing_name"
                                        class="text-danger"
                                    >
                                        Valid name is required.
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <label for="pricing_type" class="form-label"
                                        >Type</label
                                    >
                                    <select
                                        class="form-select"
                                        id="pricing_type"
                                        required
                                        v-model="pricing.pricing_type"
                                    >
                                        <option selected disabled value="">
                                            Choose...
                                        </option>
                                        <option>Wedding</option>
                                        <option>Pre Wedding</option>
                                        <option>Akad</option>
                                        <option>Lamaran</option>
                                    </select>
                                    <div
                                        v-if="validation.email"
                                        class="text-danger"
                                    >
                                        Please provide a valid type.
                                    </div>
                                </div>

                                <div class="col-6">
                                    <label for="pricing_desc" class="form-label"
                                        >Description</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="pricing_desc"
                                        placeholder=""
                                        required
                                        v-model="pricing.pricing_desc"
                                    />
                                    <div
                                        v-if="validation.pricing_desc"
                                        class="text-danger"
                                    >
                                        Valid description is required.
                                    </div>
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_price"
                                        class="form-label"
                                        >Price</label
                                    >
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="pricing_price"
                                        placeholder=""
                                        required
                                        v-model="pricing.pricing_price"
                                    />
                                    <div
                                        v-if="validation.pricing_price"
                                        class="text-danger"
                                    >
                                        Valid price is required.
                                    </div>
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_1"
                                        class="form-label"
                                        >Detail 1
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_1"
                                        class="form-control"
                                        id="pricing_detail_1"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_1"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_2"
                                        class="form-label"
                                        >Detail 2
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_2"
                                        class="form-control"
                                        id="pricing_detail_2"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_2"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_3"
                                        class="form-label"
                                        >Detail 3
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_3"
                                        class="form-control"
                                        id="pricing_detail_3"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_3"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_4"
                                        class="form-label"
                                        >Detail 4
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_4"
                                        class="form-control"
                                        id="pricing_detail_4"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_4"
                                    />
                                </div>
                                <div class="col-6">
                                    <label
                                        for="pricing_detail_5"
                                        class="form-label"
                                        >Detail 5
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_5"
                                        class="form-control"
                                        id="pricing_detail_5"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_5"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_6"
                                        class="form-label"
                                        >Detail 6
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_6"
                                        class="form-control"
                                        id="pricing_detail_6"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_6"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_7"
                                        class="form-label"
                                        >Detail 7
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_7"
                                        class="form-control"
                                        id="pricing_detail_7"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_7"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_8"
                                        class="form-label"
                                        >Detail 8
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_8"
                                        class="form-control"
                                        id="pricing_detail_8"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_8"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_9"
                                        class="form-label"
                                        >Detail 9
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_9"
                                        class="form-control"
                                        id="pricing_detail_9"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_9"
                                    />
                                </div>

                                <div class="col-6">
                                    <label
                                        for="pricing_detail_10"
                                        class="form-label"
                                        >Detail 10
                                        <span class="text-muted"
                                            >(Optional)</span
                                        ></label
                                    >
                                    <input
                                        type="pricing_detail_10"
                                        class="form-control"
                                        id="pricing_detail_10"
                                        placeholder=""
                                        v-model="pricing.pricing_detail_10"
                                    />
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
                                    :to="{ name: 'pricing.index' }"
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