<template>
<div class="">
    <h1 class="font-black block">Популярні фільми</h1>
    <hr class="w-[100%] h-5px" />
    <div class="max-w-[95%] calcWidth  mx-auto bg-white rounded-10px p-20px">
        <div class="flex overflow-x-scroll list">
            <div v-for="({title, poster_path}, idx) in upcomingFilms" class="overflow-y-hidden min-h-350px flex flex-col justify-between w-200px flex-shrink-0 item" :key="idx">
                <img class="rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${poster_path}`" />
                <h2 class="font-bold text-12px">{{title}}</h2>
            </div>
        </div>
    </div>
    <div class="flex w-[50%] mt-20px mx-auto p-20px border-white border-2px rounded-10px flex-col">
        <div class="w-[100%]">
            <FormKit type="form" @submit="selectRandomMovie" submit-label="Обрати кіно">
                <FormKit
                    v-if="genres"
                    type="select"
                    name="genre"
                    label="Оберіть жанр"
                    :options="genres"
                    />
                <FormKit
                    type="select"
                    name="year"
                    label="Оберіть рік"
                    :options="selectYears"
                    />
            </FormKit>
        </div>
        <div>
            <div v-if="randomMovie" class="">
                <img class="rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`" />
                <h2 class="font-bold text-12px">{{randomMovie.title}}</h2>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            upcomingFilms: null,
            genres: null,
            randomMovie: null,
        }
    },
    methods: {
        async fectchUpcomingFilms() {
            const resp = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=64b9d48df1f5249c2e8adb2dbe6fd5f9&language=ru&page=1`);
            this.upcomingFilms = resp.data.results;
        },
        async fetchGenres() {
            const resp = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=64b9d48df1f5249c2e8adb2dbe6fd5f9&language=ru');
            const entries = resp.data.genres.map(item => Object.values(item))
            this.genres = Object.fromEntries(entries);
        },
        async fetchFilteredFilms(year, genre, random) {
            const resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=64b9d48df1f5249c2e8adb2dbe6fd5f9&primary_release_year=${year}&with_genres=${genre}&sort_by=popularity.desc`);
            this.randomMovie = resp.data.results[random];
            console.log(this.randomMovie);
        },
        selectRandomMovie(e) {
            const randomNumber = Math.floor(Math.random() * (0 - 19) + 19);
            this.fetchFilteredFilms(e.year, e.genre, randomNumber);
        }
    },
    computed: {
        selectYears() {
            let array = [];
            const maxYear = new Date().getFullYear();
            const minYear = 1950;

            for (let i = minYear; i <= maxYear; i++) {
                array.push(i);
            } 

            return array.reverse();
        }
    },
    mounted() {
        this.fectchUpcomingFilms();
        this.fetchGenres();
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