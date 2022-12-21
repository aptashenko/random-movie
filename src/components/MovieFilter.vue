<template>
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
                    input-class="h-[100%] bg-[#000] text-[#fff] rounded-15px px-10px font-bold w-200px text-center hover:(bg-white text-[#000] border-1px border-black) transition cursor-pointer"
                    :options="genres"
                    placeholder="обрати"
                    />
                <FormKit
                    type="select"
                    name="year"
                    label="Оберіть рік"
                    label-class="text-[#000] font-bold"
                    outer-class="mt-10px"
                    inner-class="h-35px mt-5px"
                    input-class="h-[100%] bg-[#000] text-[#fff] rounded-15px px-10px font-bold w-200px text-center hover:(bg-white text-[#000] border-1px border-black) transition cursor-pointer"
                    :options="selectYears"
                    placeholder="обрати"
                    />
                    <FormKit 
                        type="submit"
                        label="Обрати кіно"
                        input-class="text-[#000] transition duration-250 font-bold w-[50%] p-5px block mx-auto border-1px rounded-10px mt-20px cursor-pointer md:w-[25%] hover:(bg-[#000] text-[#fff])"
                    />
            </FormKit>
        </div>
        <div>
            <div v-if="randomMovie" class="mt-20px" @click="openMovieData(randomMovie)">
                <h2 class="font-bold text-20px text-[#000] mb-10px">{{randomMovie.title}}</h2>
                <img class="w-300px mx-auto rounded-5px cursor-pointer" :src="`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        genres: {
            type: Object,
            required: true,
        },
        randomMovie: {
            type: Object,
            required: false
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
    methods: {
        selectMovie(event) {
            this.$emit('selectMovie', event)
        },
        openMovieData(item) {
            this.$emit('openMovieData', item)
        }
    },
}
</script>

<style>

</style>