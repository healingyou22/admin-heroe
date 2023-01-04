<script>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useImageUpload } from "../../composables/useImageUpload.js";
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
        let { imageFile, imageUrl, handleImageSelected } = useImageUpload();

        const gallery = reactive({
            title: "",
        });

        const validation = ref([]);

        const router = useRouter();

        function store() {
            let data = new FormData();
            data.append("image", imageFile.value);
            data.append("title", gallery.title);

            axios
                .post("http://127.0.0.1:8080/api/galleries", data)
                .then((response) => {
                    console.log(response);
                    const $toast = useToast();
                    let instance = $toast.success("New Gallery Created.", {
                        position: "top-right",
                        duration: 3000,
                    });

                    // Force dismiss specific toast
                    // instance.dismiss();

                    // Dismiss all opened toast immediately
                    // $toast.clear();

                    return router.push({
                        name: "gallery.index",
                    });
                })
                .catch((err) => {
                    // validation.value = err.response.data;
                    console.log(err);
                });
        }

        return {
            gallery,
            store,
            validation,
            router,
            imageUrl,
            handleImageSelected,
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
                        <h4 class="mb-3">Gallery Create</h4>
                        <form
                            class="needs-validation"
                            novalidate
                            @submit.prevent="store"
                            enctype="multipart/form-data"
                        >
                            <div class="row g-3">
                                <label for="exampleFormControlFile1"
                                    >Image</label
                                >
                                <img
                                    v-show="imageUrl"
                                    :src="imageUrl"
                                    class="w-48 h-48 object-cover"
                                />
                                <input
                                    type="file"
                                    class="form-control-file"
                                    id="exampleFormControlFile1"
                                    accept="image/*"
                                    @change="handleImageSelected"
                                />
                                <!-- <div class="col-12">
                                    <img
                                        v-show="imageUrl"
                                        :src="imageUrl"
                                        class="w-5 h-5 object-cover"
                                    />
                                    <div class="input-group mb-3">
                                        <input
                                            type="file"
                                            class="form-control"
                                            id="inputGroupFile02"
                                            accept="image/*"
                                            @change="handleImageSelected"
                                        />
                                        <label
                                            class="input-group-text"
                                            for="inputGroupFile02"
                                            >Upload</label
                                        >
                                    </div>
                                </div> -->

                                <div class="col-12">
                                    <label for="title" class="form-label"
                                        >Title</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="title"
                                        placeholder=""
                                        required
                                        v-model="gallery.title"
                                    />
                                    <div
                                        v-if="validation.title"
                                        class="text-danger"
                                    >
                                        Valid title is required.
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
                                    :to="{ name: 'gallery.index' }"
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