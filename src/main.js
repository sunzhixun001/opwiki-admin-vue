import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Form,
  FormItem,
  Input,
  Button,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Message,
  Table,
  TableColumn,
  Pagination,
  Tag,
  Avatar,
  Select,
  Option,
  Drawer,
  Loading,
  Image,
  DatePicker,
  Col,
  Radio,
  RadioGroup,
  RadioButton,
} from 'element-ui'

import './permission'
import './filter'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Footer)
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Avatar)
Vue.use(Select)
Vue.use(Option)
Vue.use(Drawer)
Vue.use(Image)
Vue.use(DatePicker)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
