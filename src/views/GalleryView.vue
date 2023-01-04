<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

import { useImageUpload } from "../composables/useImageUpload.js";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    components: {
        Header,
        Navbar,
    },
    setup() {
        let galleries = ref([]);

        axios
            .get("http://127.0.0.1:8080/api/galleries")
            .then((result) => {
                galleries.value = result.data.data;
            })
            .catch((error) => {
                console.log(error.response);
            });

        function destroy(id, index) {
            axios
                .delete(`http://127.0.0.1:8080/api/galleries/${id}`)
                .then((result) => {
                    galleries.value.splice(index, 1);
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }

        let { imageFile, imageUrl, handleImageSelected } = useImageUpload();

        const router = useRouter();

        function store() {
            let data = new FormData();
            data.append("image", imageFile.value);

            axios
                .post("http://127.0.0.1:8080/api/galleries", data)
                .then((response) => {
                    console.log(response);
                });
        }

        return {
            galleries,
            destroy,
            router,
            imageUrl,
            handleImageSelected,
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
                    <h1 class="h2">Gallery Management</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <router-link
                                :to="{ name: 'gallery.create' }"
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
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(gallery, index) in galleries"
                                :key="index"
                            >
                                <td>
                                    <img
                                        class="img-gallery"
                                        :src="gallery.image"
                                        alt=""
                                        srcset=""
                                    />
                                </td>
                                <td>{{ gallery.title }}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-danger btn-sm"
                                        @click="destroy(gallery.id, index)"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.img-gallery {
    width: 10%;
    height: 10%;
}
</style>