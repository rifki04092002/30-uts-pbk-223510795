<template>
  <div class="container">
    <h1>Albums</h1>
    <select v-model="selectedAlbum" @change="navigateToAlbumDetail" class="album-dropdown">
      <option value="">Choose Album...</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.title }}
      </option>
    </select>

    <div v-if="isLoading" class="loading">Loading Albums...</div>
    <template v-else>
      <div v-if="selectedAlbum !== null && selectedAlbum !== ''">
        <h2>Photos from Album: {{ selectedAlbumTitle }}</h2>
        <div v-if="isLoadingPhotos" class="loading">Loading Photos...</div>
        <template v-else>
          <div v-if="filteredPhotos.length === 0" class="no-photos">
            No photos found for this album.
          </div>
          <div class="photos-grid" v-else>
            <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
              <img :src="photo.thumbnailUrl" :alt="photo.title" />
              <p>{{ photo.title }}</p>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="no-album-selected text-black">
        Please select an album to view photos.
      </div>
    </template>
  </div>
</template>

<script setup>
import { useAlbumStore } from '../stores/albumStore.js';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useAlbumStore();
const router = useRouter();

const selectedAlbum = ref(null);

onMounted(() => {
  store.getAlbums();
});

const navigateToAlbumDetail = () => {
  if (selectedAlbum.value !== null && selectedAlbum.value !== '') {
    router.push({ name: 'AlbumPhotos', params: { id: selectedAlbum.value } });
  }
};

const isLoading = computed(() => store.isLoading);
const isLoadingPhotos = computed(() => store.isLoadingPhotos);
const albums = computed(() => store.albums);
const photos = computed(() => store.photos);
const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);

const filteredPhotos = computed(() => {
  return photos.value.filter(photo => photo.albumId === selectedAlbum.value);
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 9em;
  color: #0f0e0e;
}

.album-dropdown {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.loading {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #777;
  font-style: italic;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.photo-item {
  text-align: center;
  transition: transform 0.3s;
}

.photo-item img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.no-photos, .no-album-selected {
  margin-top: 20px;
  text-align: center;
  color: #888;
  font-size: 18px;
  font-style: italic;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #555;
}
</style>
