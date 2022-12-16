<template>
<div class="py-20px">
    <h1 class="font-black block pb-20px text-24px text-[#fff]">Популярні фільми</h1>
    <hr class="w-[100%] h-5px" />
    <div class="max-w-[95%] calcWidth  mx-auto bg-white rounded-10px p-20px">
        <div class="flex overflow-x-scroll list">
            <div v-for="({title, poster_path}, idx) in upcomingFilms" class="overflow-y-hidden min-h-350px flex flex-col justify-between overflow-hidden w-200px flex-shrink-0 item" :key="idx">
                <img class="w-[100%] rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${poster_path}`" />
                <h2 class="font-bold text-12px">{{title}}</h2>
            </div>
        </div>
    </div>
    <div class="flex w-[95%] bg-white mt-20px mx-auto p-20px border-grey border-2px rounded-10px flex-col md:w-[50%]">
        <div class="w-[100%]">
            <FormKit 
                type="form"
                id="selectMovie"
                @submit="selectMovie"
                :actions="false"
            >
                <FormKit
                    v-if="genres"
                    type="select"
                    name="genre"
                    label="Оберіть жанр"
                    label-class="text-[#000] font-bold"
                    inner-class="h-35px mt-5px"
                    input-class="h-[100%] bg-[#000] text-[#fff] rounded-15px px-10px font-bold w-200px hover:(bg-white text-[#000] border-1px border-black) transition cursor-pointer"
                    :options="genres"
                    />
                <FormKit
                    type="select"
                    name="year"
                    label="Оберіть рік"
                    label-class="text-[#fff] font-bold"
                    outer-class="mt-10px"
                    inner-class="h-35px mt-5px"
                    input-class="h-[100%] bg-[#000] text-[#fff] rounded-15px px-10px font-bold w-200px text-center hover:(bg-white text-[#000] border-1px border-black) transition cursor-pointer"
                    :options="selectYears"
                    />
                    <buttom 
                        @click="submitForm"
                        class="text-[#000] transition duration-250 font-bold w-[50%] p-5px block mx-auto border-1px rounded-10px mt-20px cursor-pointer md:w-[25%] hover:(bg-[#000] text-[#fff])"
                    >
                    Обрати кіно
                    </buttom>
            </FormKit>
        </div>
        <div>
            <div v-if="randomMovie" class="mt-20px" @click="openMovieData">
                <h2 class="font-bold text-20px text-[#000] mb-10px">{{randomMovie.title}}</h2>
                <img class="w-300px mx-auto rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`" />
            </div>
        </div>
    </div>
    <PopUp v-if="showModal" :movieData="randomMovie" />
</div>
</template>

<script>
import axios from 'axios';
import PopUp from '../components/PopUp.vue';
export default {
    data() {
        return {
            upcomingFilms: null,
            genres: null,
            randomMovie: null,
            showModal: false,
        }
    },
    components: {
        PopUp,
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
        },
        submitForm(e) {
            e.preventDefault();
            this.$formkit.submit('selectMovie')
        },
        selectMovie(e) {
            const randomNumber = Math.floor(Math.random() * (0 - 19) + 19);
            this.fetchFilteredFilms(e.year, e.genre, randomNumber);
        },
        openMovieData() {
            this.showModal = true;
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