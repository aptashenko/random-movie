<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper" @click="closeModal">
      <div class="modal-container overflow-scroll w-80vw h-600px md:(w-60vw h-40vw scrollbar-hide)">
        <h2 class="font-bold text-[#000] text-6vw mb-4vw md:(mb-1.5vw text-2vw)">
          {{movieData.title}}
        </h2>
        <div class="flex w-[100%] flex-col md:flex-row">
          <img class="mx-auto rounded-5px md:(w-[39%] mr-10px)" :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`" />
          <div class="flex flex-col mt-3vw md:mt-0">
              <div class="flex text-left">
                <p class="font-bold text-3vw min-w-50px w-50px leading-tight md:(min-w-10vw text-1.3vw)">Жанр:</p>
                <p class="leading-tight text-3vw md:(text-1.2vw)">{{movieGenres}}</p>
              </div>
              <div class="flex text-left">
                <p class="font-bold text-3vw min-w-50px w-50px my-5px leading-tight md:(min-w-10vw text-1.3vw)">Дата релізу:</p>
                <p class="leading-tight text-3vw my-5px md:(text-1.2vw)">{{ releaseDate }} <span class="opacity-50 text-14px">({{ dateFromNow }})</span></p>
              </div>
              <div class="flex text-left">
                <p class="font-bold text-3vw min-w-50px w-50px leading-tight md:(text-1.3vw min-w-10vw)">Опис:</p>
                <p class="leading-tight text-3vw md:(text-1.2vw)">{{ movieData.overview ? movieData.overview : 'Опис відсутній у базі' }}</p>
              </div>
              <a :href="searchQuery" target="_blank" class="block p-10px border-1px w-200px mx-auto mt-20px transition font-bold hover:(bg-[#000] text-[#fff])">Знайти</a>
          </div>
        </div>
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