import sysConfig from '../utils/constant'
export default {
  data() {
    return {
      currentImgSkinUrl: sysConfig.img_skin_url[process.env.NODE_ENV]
    }
  },
  methods: {
    getSkinImg(name = '') {
      return this.currentImgSkinUrl + sysConfig.skin_img_info[name]
    },
    getSkinBg(name = '') {
      return {
        background: 'url(' + this.currentImgSkinUrl + sysConfig.skin_bg_info[name].bg_suffix,
        backgroundSize: sysConfig.skin_bg_info[name].bg_size
      }
    }
  }
}
