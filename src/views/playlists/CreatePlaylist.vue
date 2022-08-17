<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create Playlist</h4>
    <input
      type="text"
      required
      placeholder="Playlist Title..."
      v-model="title"
    />
    <textarea
      required
      v-model="description"
      placeholder="Playlist Description..."
    ></textarea>
    <!-- upload playlist image -->
    <label>Upload image cover playlist</label>
    <input type="file" @change="handleChange" />
    <!-- fileinput error -->
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  name: "CreatePlaylist",
  setup() {
    const { url, fileUpload, filePath } = useStorage();
    const { user } = getUser();
    const { error, addDoc } = useCollection("playlists");
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await fileUpload(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, // so we can delete it later
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          console.log("add playlist success!");
          router.push({ name: "PlaylistDetail", params: { id: res.id } });
        }
      }
    };

    const types = ["image/jpeg", "image/jpg", "image/png"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image (png or jpeg or jpg)";
      }
    };
    return {
      handleSubmit,
      title,
      description,
      handleChange,
      file,
      fileError,
      isPending,
    };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
  margin-left: 0px;
}
</style>