import './styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaGithub, FaArrowAltCircleLeft, BiGearFill, FaSun, FaMoon,
         GiSoundOn, GiSoundOff, FaWindowClose, BiPlusCircleFill, BiDashCircleFill,
         MdSportsscore, IoTimeSharp, MdDeleteforever, MdAdsclickOutlined, FaMedal} from "oh-vue-icons/icons";

addIcons(FaGithub,FaArrowAltCircleLeft,BiGearFill,FaSun,FaMoon, GiSoundOn, GiSoundOff, FaWindowClose, 
         BiPlusCircleFill, BiDashCircleFill, MdSportsscore, IoTimeSharp, MdDeleteforever, MdAdsclickOutlined, FaMedal);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
