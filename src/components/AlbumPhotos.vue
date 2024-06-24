<template>
  <div class="container">
    <h2>Album:</h2>
    <h4 class="text-center">{{ selectedAlbumTitle }}</h4><br>
    <div v-if="isLoadingPhotos" class="loading">Loading Photos...</div>
    <div v-else>
      <div class="photos-grid">
        <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
          <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showFullSizePhoto(photo.url, photo.title)" />
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="showFullSizeModal" class="full-size-photo-modal" @click="hideFullSizePhoto">
        <div class="modal-content" @click.stop>
          <span class="close-button" @click="hideFullSizePhoto">&times;</span>
          <img :src="selectedPhotoUrl" :alt="selectedPhotoTitle" />
          <p>{{ selectedPhotoTitle }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlbumStore } from '../stores/albumStore';
import { ref, computed, onMounted } from 'vue';

const store = useAlbumStore();
const router = useRouter();

const selectedAlbum = ref(null);
const showFullSizeModal = ref(false);
const selectedPhotoUrl = ref(null);
const selectedPhotoTitle = ref('');

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    selectedAlbum.value = parseInt(router.currentRoute.value.params.id);
    store.selectAlbum(selectedAlbum.value);
  }
});

const isLoadingPhotos = computed(() => store.isLoadingPhotos);
const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);
const filteredPhotos = computed(() => store.photos.filter(photo => photo.albumId === selectedAlbum.value));

const showFullSizePhoto = (url, title) => {
  selectedPhotoUrl.value = url;
  selectedPhotoTitle.value = title;
  showFullSizeModal.value = true;
};

const hideFullSizePhoto = () => {
  showFullSizeModal.value = false;
  selectedPhotoUrl.value = null;
  selectedPhotoTitle.value = '';
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
  font-style: italic;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.photo-item {
  text-align: center;
  cursor: pointer;
}

.photo-item img {
  max-width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.photo-item img:hover {
  transform: scale(1.05);
}

.full-size-photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 80%;
  overflow: auto;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 10px;
  margin-bottom: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
