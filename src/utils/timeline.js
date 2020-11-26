import store from '@/store';

export let visibleDetail = (status) => {
    console.log('store', store)
    store.commit('timeline/changeVisible', status);
};
export let currentDetail = (id) => {
    store.commit('timeline/changeCurrent', id);
};