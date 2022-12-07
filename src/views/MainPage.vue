<template>
<div class="">
    <h1 class="font-black block">Популярні фільми</h1>
    <hr class="w-[100%] h-5px" />
    <div class="max-w-[95%] calcWidth  mx-auto bg-white rounded-10px p-20px">
        <div class="flex overflow-x-scroll list">
            <div v-for="({title, poster_path}, idx) in firstList" class="overflow-y-hidden min-h-350px flex flex-col justify-between w-200px flex-shrink-0 item" :key="idx">
                <img class="rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${poster_path}`" />
                <h2 class="font-bold text-12px">{{title}}</h2>
            </div>
        </div>
    </div>
    <div class="flex w-[50%] mx-auto p-20px border-white border-2px rounded-10px">
        <div>
            <FormKit type="form" @submit="randomMovie" submit-label="Обрати кіно">
                <FormKit
                    type="select"
                    name="genre"
                    label="Оберіть жанр"
                    :options="genres"
                    />
                <FormKit
                    type="select"
                    name="country"
                    label="Оберіть країну"
                    :options="countries"
                    />
            </FormKit>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';

export default {
    setup() {
        const API_KEY = '64b9d48df1f5249c2e8adb2dbe6fd5f9';
        axios.defaults.baseURL = `https://api.themoviedb.org/3`;

        let firstList = ref([]);
        let genres = ref([]);
        let countries = ref([]);

        let choosenGenre = ref(null)

        onBeforeMount(() => {
            fetchGenres(API_KEY)
            fetchPopularMovies(API_KEY)
            fetchContries(API_KEY)
            searchMovie(API_KEY)

        })

        const fetchPopularMovies = async (apiKey) => {
            const resp = await axios.get(`/movie/popular?api_key=${apiKey}&language=ru`);
            firstList.value = resp.data.results;
        }

        const fetchGenres = async (apiKey) => {
            const resp = await axios.get(`/genre/movie/list?api_key=${apiKey}&language=ru`)
            genres.value = resp.data.genres.map(item => item.name)
        }

        const fetchContries = async (apiKey) => {
            const resp = await axios.get(`/configuration/countries?api_key=${apiKey}`)
            countries.value = resp.data.map(item => item.english_name)
        }

        const searchMovie = async (apiKey) => {
            const resp = await axios.get(`/search/movie?&api_key=${apiKey}&language=ru&page=1&region=ireland&year=2022`)
            console.log(resp)
        }

        const randomMovie = (value) => {
            console.log(value)
        }

        return {
            firstList, 
            genres, 
            choosenGenre, 
            randomMovie, 
            countries
        }
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