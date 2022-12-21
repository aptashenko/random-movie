<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper" @click="closeModal">
      <div class="modal-container max-w-[50%]">
        <h2 class="font-bold text-20px text-[#000] mb-10px">
          {{movieData.title}}
        </h2>
        <img class="w-[55%] mx-auto rounded-5px" :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`" />
        <div class="flex mt-20px">
            <div class="flex flex-col mr-10px min-w-100px text-left">
              <p class="font-bold text-1.5vw leading-tight">Жанр:</p>
              <p class="font-bold my-5px text-1.5vw leading-tight">Дата релізу:</p>
              <p class="font-bold text-1.5vw leading-tight">Опис:</p>
            </div>
            <div class="flex flex-col text-left">
              <p class="text-1.5vw leading-tight">{{movieGenres}}</p>
              <p class="text-1.5vw leading-tight my-5px">{{ releaseDate }} <span class="opacity-50 text-14px">({{ dateFromNow }})</span></p>
              <p class="text-1.5vw leading-tight">{{ movieData.overview ? movieData.overview : 'Опис відсутній у базі' }}</p>
            </div>
        </div>
        <a :href="searchQuery" target="_blank" class="block p-10px border-1px w-200px mx-auto mt-20px font-bold hover:(bg-[#000] text-[#fff])">Знайти</a>
      </div>
    </div>
  </div>  
</transition>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uk'

dayjs.extend(relativeTime).locale('uk');

export default {
    props: {
      movieData: {
        type: Object,
        required: false,
      },
      genres: {
        type: Object,
        required: false
      },
    },
    methods: {
      closeModal(e) {
        this.$emit('close', e)
      },
    },
    computed: {
      movieGenres() {
        return this.movieData.genre_ids.map(item => this.genres[item]).join(', ') 
      },
      releaseDate() {
        return dayjs(this.movieData.release_date).format('DD.MM.YYYY')
      },
      dateFromNow() {
        return dayjs(this.movieData.release_date).fromNow()
      },
      searchQuery() {
        const baseURL = 'https://www.google.com/';
        const queryMovieTitle = this.movieData.title.replaceAll(' ', '+').replaceAll(':', '%3A').replaceAll("'", '%27');
        return `${baseURL}search?q=${queryMovieTitle}+дивитись+онлайн`
      }
    },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: fit-content;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>