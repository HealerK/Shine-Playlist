<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add New Song</h4>
      <input type="text" placeholder="Title" required v-model="title" />
      <input type="text" placeholder="Aritst" required v-model="artist" />
      <button v-if="!isPending">Add</button>
      <button v-if="isPending" disabled>Saving</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "../composables/useDocument";
export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { updateDoc, isPending } = useDocument(
      "playlists",
      props.playlist.id
    );

    const handleSubmit = async () => {
      const addSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000),
      };

      await updateDoc({
        songs: [...props.playlist.songs, addSong],
      });

      title.value = "";
      artist.value = "";
    };

    return { title, artist, showForm, handleSubmit, isPending };
  },
};
</script>

<style>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
  margin-bottom: 30px;
}
</style>