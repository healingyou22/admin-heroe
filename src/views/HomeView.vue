<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    components: { Header, Navbar, FullCalendar },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                eventColor: "green",
                editable: true,
                eventClick: this.handleEventClick,
                dateClick: this.handleDateClick,
                events: [],
            },
        };
    },
    methods: {
        handleEventClick: function (arg) {
            alert("Event : " + arg.event.title);
        },
        handleDateClick: function (arg) {},
        getEvents() {
            axios.get("http://127.0.0.1:8080/api/events").then(
                (response) => {
                    // console.log(response.data);
                    this.calendarOptions.events = response.data;
                },
                (error) => {
                    console.log(error.response);
                }
            );
        },
    },
    mounted() {
        this.events = this.getEvents();
    },
    setup() {
        // reactive state
        let datas = ref([]);
        let info = null;
        let info2 = ref([]);
        let orders = ref([]);
        let filters = ref([]);

        onMounted(() => {
            // get data from api endpoint
            axios
                .get("http://127.0.0.1:8080/api/dashboard")
                .then((result) => {
                    datas.value = result.data.data;
                })
                .catch((err) => {
                    err;
                });

            axios
                .get("http://127.0.0.1:8080/api/orders")
                .then((result) => {
                    // orders.value = result.data.data;

                    // filters = orders.value.filter(function (data) {
                    //     return (
                    //         data.order_status !== "Canceled" ||
                    //         (data.order_status !== "Finished" &&
                    //             data.payment_status == "Success")
                    //     );
                    // });

                    info = result.data;

                    info2.value = info.data.filter(function (data) {
                        return (
                            data.order_status !== "Canceled" ||
                            (data.order_status !== "Finished" &&
                                data.payment_status == "Success")
                        );
                    });

                    console.log(info2);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });

        return {
            datas,
            orders,
            filters,
            info,
            info2,
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
                    <h1 class="h2">Dashboard</h1>
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
                            <span class="align-text-bottom"
                                ><img src="/icons/calendar.svg" alt=""
                            /></span>
                            This week
                        </button>
                    </div>
                </div>

                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div
                                    class="
                                        card
                                        border-left-primary
                                        shadow
                                        h-100
                                        py-2
                                    "
                                    style="width: fit-content"
                                >
                                    <div class="card-body">
                                        <div
                                            class="
                                                row
                                                no-gutters
                                                align-items-center
                                            "
                                        >
                                            <div class="col mr-2">
                                                <div
                                                    class="
                                                        text-xs
                                                        font-weight-bold
                                                        text-primary
                                                        text-uppercase
                                                        mb-1
                                                    "
                                                >
                                                    User
                                                </div>
                                                <div
                                                    class="
                                                        h5
                                                        mb-0
                                                        font-weight-bold
                                                        text-gray-800
                                                    "
                                                >
                                                    {{ datas.user }}
                                                </div>
                                                <router-link
                                                    :to="{ name: 'user.index' }"
                                                    type="button"
                                                    class="btn btn-success"
                                                >
                                                    Show
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div
                                    class="
                                        card
                                        border-left-success
                                        shadow
                                        h-100
                                        py-2
                                    "
                                    style="width: fit-content"
                                >
                                    <div class="card-body">
                                        <div
                                            class="
                                                row
                                                no-gutters
                                                align-items-center
                                            "
                                        >
                                            <div class="col mr-2">
                                                <div
                                                    class="
                                                        text-xs
                                                        font-weight-bold
                                                        text-success
                                                        text-uppercase
                                                        mb-1
                                                    "
                                                >
                                                    Order
                                                </div>
                                                <div
                                                    class="
                                                        h5
                                                        mb-0
                                                        font-weight-bold
                                                        text-gray-800
                                                    "
                                                >
                                                    {{ datas.order }}
                                                </div>
                                                <router-link
                                                    :to="{
                                                        name: 'order.index',
                                                    }"
                                                    type="button"
                                                    class="btn btn-success"
                                                >
                                                    Show
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div
                                    class="
                                        card
                                        border-left-info
                                        shadow
                                        h-100
                                        py-2
                                    "
                                    style="width: fit-content"
                                >
                                    <div class="card-body">
                                        <div
                                            class="
                                                row
                                                no-gutters
                                                align-items-center
                                            "
                                        >
                                            <div class="col mr-2">
                                                <div
                                                    class="
                                                        text-xs
                                                        font-weight-bold
                                                        text-info text-uppercase
                                                        mb-1
                                                    "
                                                >
                                                    Gallery
                                                </div>
                                                <div
                                                    class="
                                                        h5
                                                        mb-0
                                                        font-weight-bold
                                                        text-gray-800
                                                    "
                                                >
                                                    {{ datas.gallery }}
                                                </div>
                                                <router-link
                                                    :to="{
                                                        name: 'gallery.index',
                                                    }"
                                                    type="button"
                                                    class="btn btn-success"
                                                >
                                                    Show
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div
                                    class="
                                        card
                                        border-left-warning
                                        shadow
                                        h-100
                                        py-2
                                    "
                                    style="width: fit-content"
                                >
                                    <div class="card-body">
                                        <div
                                            class="
                                                row
                                                no-gutters
                                                align-items-center
                                            "
                                        >
                                            <div class="col mr-2">
                                                <div
                                                    class="
                                                        text-xs
                                                        font-weight-bold
                                                        text-warning
                                                        text-uppercase
                                                        mb-1
                                                    "
                                                >
                                                    Pricing
                                                </div>
                                                <div
                                                    class="
                                                        h5
                                                        mb-0
                                                        font-weight-bold
                                                        text-gray-800
                                                    "
                                                >
                                                    {{ datas.pricing }}
                                                </div>
                                                <router-link
                                                    :to="{
                                                        name: 'pricing.index',
                                                    }"
                                                    type="button"
                                                    class="btn btn-success"
                                                >
                                                    Show
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <h2>Orders</h2>
                            <div class="table-responsive">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Payment Status</th>
                                            <th scope="col">Order Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(filter, index) in info2"
                                            :key="index"
                                        >
                                            <td>{{ filter.date }}</td>
                                            <td>{{ filter.full_name }}</td>
                                            <td>{{ filter.payment_status }}</td>
                                            <td>{{ filter.order_status }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-6">
                            <FullCalendar
                                ref="fullCalendar"
                                :options="calendarOptions"
                                :events="event"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

