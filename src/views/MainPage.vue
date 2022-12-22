<template>
<div class="py-20px">
    <h1 class="font-black block pb-20px text-24px text-[#fff]">Популярні фільми</h1>
    <hr class="w-[100%] h-5px" />
    <UpcomingFilms v-model:page="page" v-model:upcomingFilms="upcomingFilms" @openMovieData="openMovieData" />
    <MovieFilter :genres="genres" :randomMovie="randomMovie" @selectMovie="selectMovie" @openMovieData="openMovieData" />
    <PopUp v-if="showModal" :genres="genres" :movieData="movieDetails" @close="closeModal" />
</div>
</template>

<script>
import PopUp from '@/components/PopUp.vue';
import UpcomingFilms from '@/components/UpcomingFilms.vue';
import MovieFilter from '@/components/MovieFilter.vue';
import { fectchUpcomingFilms, fetchGenres, fetchFilteredFilms } from '@/services/api';
export default {
    data() {
        return {
            upcomingFilms: null,
            page: 1,
            genres: null,
            movieDetails: null,
            randomMovie: null,
            showModal: false,
        }
    },
    components: {
        PopUp,
        UpcomingFilms,
        MovieFilter
    },
    methods: {
        closeModal(e) {
            if(e.target === e.currentTarget) {
                this.showModal = false
            }
        },
        selectMovie(e) {
            const randomNumber = Math.floor(Math.random() * (0 - 19) + 19);
            fetchFilteredFilms(e.year, e.genre).then(resp => {
                this.randomMovie = resp.data.results[randomNumber];
            })
        },
        openMovieData(item) {
            this.movieDetails = item;
            this.showModal = true;
        },
    },
    watch: {
        page() {
            fectchUpcomingFilms(this.page).then(resp => {
                this.upcomingFilms = resp.data.results
            })
        }
    },
    mounted() {
        fectchUpcomingFilms(this.page).then(resp => {
            this.upcomingFilms = resp.data.results
        })
        fetchGenres().then(resp => {
            const entries = resp.data.genres.map(item => Object.values(item));
            this.genres = Object.fromEntries(entries);
        })
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