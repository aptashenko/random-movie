<template>
<div class="">
    <h1 class="font-black block">Популярні фільми</h1>
    <hr class="w-[100%] h-5px" />
    <div class="max-w-[95%] calcWidth  mx-auto bg-white rounded-10px p-20px">
        <div class="flex overflow-x-scroll list">
            <div v-for="({title, poster_path}, idx) in firstList" class="pic overflow-y-hidden min-h-350px flex flex-col justify-between w-200px flex-shrink-0 item" :key="idx" @click="() => showImg(idx)">
                <img class="rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${poster_path}`" />
                <h2 class="font-bold text-12px">{{title}}</h2>
            </div>
        </div>
        <vue-easy-lightbox :visible="visibleRef" :imgs="imgs" :index="indexRef" @hide="onHide"></vue-easy-lightbox>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'


export default {
    components: {
    VueEasyLightbox
  },
    setup() {
        const API_KEY = '64b9d48df1f5249c2e8adb2dbe6fd5f9';
        axios.defaults.baseURL = `https://api.themoviedb.org/3`;

        let firstList = ref([]);
        let page = reactive(1);

        const visibleRef = ref(false)
        const indexRef = ref(0)

        const onHide = () => visibleRef.value = false;
        const showImg = (index) => {
            indexRef.value = index
            visibleRef.value = true
          }

        onMounted(() => {
            fetchPopularMovies(API_KEY, page)
        })

        const fetchPopularMovies = async (apiKey, page) => {
            const resp = await axios.get(`/movie/popular?api_key=${apiKey}&language=ru&page=${page}`);
            firstList.value = resp.data.results;
        }

        return {firstList, visibleRef, indexRef, onHide, showImg}
    }
}

</script>


<style>
.calcWidth {
    width: calc(100% - 20px)
}

.item:last-child {
    position: relative;
}

.item:not(:last-child) {
    margin-right: 10px;
}

.item:last-child::after {
  position: absolute;
  left: 100%;
  height: 1px;
  width: 20px;
  display: block;
  content: "";
}

.list::-webkit-scrollbar {
    display: none;
}
</style>