<template>
<div>
    <div class="">
        <h1 class="font-black block">Випадкові фільми</h1>
        <hr class="w-[100%] h-5px" />
        <div class="flex w-9999999px overflow-scroll">
            <div class="w-250px mr-10px" v-for="({title, poster_path}, idx) in firstList" :key="idx">
                <div class="w-[80%] mx-auto">
                    <img class="rounded-5px" :src="`https://image.tmdb.org/t/p/w500/${poster_path}`" />
                    <h2 class="font-bold">{{title}}</h2>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="flex">
            <button class="w-100px border-1px mr-10px border-solid border-black rounded-10px" @click="addPage()">prev page</button>
            <button class="w-100px border-1px border-solid border-black rounded-10px" @click="addPage()">next page</button>
        </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const API_KEY = '64b9d48df1f5249c2e8adb2dbe6fd5f9';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;

let firstList = ref([]);
let page = ref(1);

onMounted(() => {
    fetchPopularMovies(page)
})

const addPage = () => {
    page.value++;
}

const fetchPopularMovies = async (page) => {
    const resp = await axios.get(`/movie/popular?api_key=${API_KEY}&language=ru&page=${page}`);
    firstList.value = resp.data.results;
    console.log(firstList.value);
}



</script>