<template>
    <div class="max-w-[95%] calcWidth  mx-auto bg-white rounded-10px p-20px h-390px">
        <div v-if="upcomingFilms" id="gallery" class="flex overflow-x-scroll list transition">
            <div v-for="(item, idx) in upcomingFilms" class="overflow-y-hidden min-h-350px flex flex-col justify-between overflow-hidden w-200px flex-shrink-0 item" :key="idx">
                <img class="w-[100%] rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`" @click="selectedMovie(item)" />
                <h2 class="font-bold text-12px">{{item.title}}</h2>
            </div>
            <div class="overflow-y-hidden min-h-350px flex flex-col justify-between overflow-hidden w-100px flex-shrink-0 item items-center">
                <button class="p-5px h-80px w-80px rounded-[50%] border-2px text-12px text-[#000] my-auto hover:(bg-[#000] text-[#fff]) transition" @click="nextPage()">Далі</button>
            </div>
        </div>
    </div>
</template>

<script>

// ЗРОБИТИ КНОПКУ ДАЛІ PAGE NEXT
export default {
    props: {
        upcomingFilms: {
            type: Object,
            required: true,
        },
        page: {
            type: Number,
            required: true
        }
    },
    methods: {
        selectedMovie(item) {
            this.$emit('openMovieData', item)
        },
        scrollGalleryToStart() {
            const gallery = document.getElementById('gallery');
            let scrollWidth = gallery.scrollLeft;
            let scrollInterval = setInterval(()=>{
                if (scrollWidth > 0 ) {
                    scrollWidth -= 100;
                    gallery.scrollLeft = scrollWidth;
                } else {
                    clearInterval(scrollInterval)
                }
            }, 1)
        },
        nextPage() {
            this.$emit('update:upcomingFilms', null)
            this.$emit('update:page', this.page + 1)
            this.scrollGalleryToStart()
        },
    },
}
</script>