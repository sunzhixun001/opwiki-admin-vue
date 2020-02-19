<template>
    <character-table />
</template>
<script>
import CharacterTable from './components/table'
import {
    getCollection
} from '../../api/character'
export default {
    data () {
        return {
            
        }
    },
    mounted() {
        getCollection().then(response => {
            console.log('getCollection response', response)
        }).catch(error => {
            console.log(error)
        })
    },
    components: {
        'character-table': CharacterTable
    }
}
</script>