import store from '@/store';

export let visibleDetail = (status) => {
    console.log('store', store)
    store.commit('timeline/changeVisible', status);
};
export let currentDetail = (id) => {
    store.commit('timeline/changeCurrent', id);
};
export let searchCondition = (form) => {
    return (`
        db.command.or([
            {
                fullname: db.RegExp({
                    regexp: ".*${form.keyword || ''}.*",
                    options: 'i'
                })
            },
            {
                priateRegimentName: db.RegExp({
                    regexp: ".*${form.keyword || ''}.*",
                    options: 'i'
                })
            }
        ])
    `).replace(/\s/g, '');
};