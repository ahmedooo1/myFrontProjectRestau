<template>
  <div class="container mx-auto mt-8 p-4 w-full">
    <h2 class="text-2xl font-bold mb-4 text-white">Commentaires</h2>
    <div v-if="comments.length === 0" class="text-white">Aucun commentaire pour l'instant.</div>
    <div v-for="comment in comments" :key="comment.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
      <div class="flex items-center">
        <img v-if="comment.user.picture" :src="`data:image/png;base64,${comment.user.picture}`" alt="User Picture" class="w-8 h-8 rounded-full mr-2">
        <span class="font-bold">{{ comment.user.name }}</span>
      </div>
      <div class="text-gray-600 text-sm mt-2">
        <p v-if="!editingComment || editingComment.id !== comment.id" class="text-gray-800">{{ comment.content }}</p>
        <input
          v-else
          v-model="editingComment.content"
          class="w-full px-3 py-2 border rounded"
        />
        <span class="ml-auto text-xs mt-2">le {{ new Date(comment.createdAt).toLocaleDateString() }}</span>
      </div>
      <div v-if="comment.user.id === userId" class="mt-2 w-full flex justify-between">
        <button v-if="!editingComment || editingComment.id !== comment.id" @click="editComment(comment)" class="bg-yellow-500 text-white px-4 py-2 rounded">
          <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/create-new.png" alt="create-new"/>
        </button>
        <button v-else @click="saveComment(comment)" class="bg-green-500 text-white px-4 py-2 rounded">Enregistrer</button>
        <button @click="deleteComment(comment.id)" class="bg-red-500 text-white px-4 py-2 rounded ml-2">
          <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/delete--v1.png" alt="delete--v1"/>
        </button>
      </div>
    </div>
    <div class="mt-8" v-if="$auth.loggedIn">
      <h3 class="text-xl font-semibold mb-4 text-white">Ajouter un commentaire</h3>
      <form @submit.prevent="addComment">
        <div class="mb-4">
          <label for="content" class="block text-gray-300">Commentaire</label>
          <textarea
            v-model="newComment.content"
            id="content"
            required
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded"
          :disabled="isSubmitting"
        >
          Ajouter
        </button>
      </form>
      <p v-if="message" class="mt-4 text-white">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItemId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      newComment: {
        content: '',
        userId: this.$auth.user ? this.$auth.user.id : null,
        menuItemId: this.menuItemId
      },
      message: '',
      isSubmitting: false,
      editingComment: null,
      userId: this.$auth.user ? this.$auth.user.id : null
    }
  },
  async mounted() {
    await this.fetchComments()
  },
  methods: {
    async fetchComments() {
      try {
        const response = await this.$axios.get(`/comments?menuItemId=${this.menuItemId}`)
        this.comments = response.data
      } catch (error) {
        console.error('Failed to fetch comments', error)
      }
    },
    async addComment() {
      this.isSubmitting = true
      try {
        const response = await this.$axios.post('/comments', this.newComment)
        this.comments.push(response.data)
        this.newComment.content = ''
        this.message = 'Commentaire ajouté avec succès'
      } catch (error) {
        console.error('Failed to add comment', error)
        this.message = error.response.data.message || 'Une erreur est survenue'
      } finally {
        this.isSubmitting = false
      }
    },
    async deleteComment(commentId) {
      try {
        await this.$axios.delete(`/comments/${commentId}`)
        this.comments = this.comments.filter(comment => comment.id !== commentId)
      } catch (error) {
        console.error('Failed to delete comment', error)
      }
    },
    editComment(comment) {
      this.editingComment = { ...comment }
    },
    async saveComment(comment) {
      try {
        await this.$axios.put(`/comments/${comment.id}`, { content: this.editingComment.content })
        Object.assign(comment, this.editingComment)
        this.editingComment = null
      } catch (error) {
        console.error('Failed to update comment', error)
      }
    }
  }
}
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
