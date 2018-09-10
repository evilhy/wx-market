<template>
    <mt-popup v-model="flag" position="right" class="img-viewer-wrap">
        <swiper :options="swiperOption" ref="imgSwiper">
            <swiper-slide v-for="(img, index) in imgList" :key="index">
                <div class="swiper-zoom-container" @click="close">
                    <img :src="img">
                </div>
            </swiper-slide>
        </swiper>
    </mt-popup>
</template>
<script>
export default {
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        imgList: {
            type: Array
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            swiperOption: {
                zoom: true
            }
        }
    },
    computed: {
        swiper () {
            return this.$refs.imgSwiper.swiper
        }
    },
    watch: {
        flag (val) {
            val && this.swiper.slideTo(this.index)
            this.swiper.zoom.scale > 1 && this.swiper.zoom.out()
        }
    },
    created () {
        if (this.index) {
            this.swiperOption.initialSlide = this.index
        }
    },
    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>