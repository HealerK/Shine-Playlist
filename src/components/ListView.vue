<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetail', params: { id: playlist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" />
        </div>
        <div class="info">
          <h3>{{ playlist.title }}</h3>
          <p>{{ playlist.description }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div></router-link
    >
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: ["playlists"],
};
</script>

<style scoped>
.single {
  display: flex !important;
  align-items: center !important;
  padding: 20px !important;
  border-radius: 10px !important;
  background: white !important;
  margin: 16px 0 !important;
  transition: all ease 0.2s !important;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05) !important;
  transform: scale(1.02) !important;
  transition: all ease 0.2s !important;
}
.thumbnail {
  max-width: 100px !important;
  max-height: 100px !important;
  overflow: hidden !important;
  border-radius: 10px !important;
}
img {
  max-width: 150% !important;
  max-height: 150% !important;
  display: block !important;
}
.info {
  margin: 0 30px !important;
}
.song-number {
  margin-left: auto !important;
}
</style>