<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li v-on:click.prevent="changeCurrentPage(currentPage - 1)">
            <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li class="active" v-on:click="changeCurrentPage(currentPage)"><a href="#">{{currentPage}}</a></li>
            <li v-on:click.prevent="changeCurrentPage(currentPage + 1)"><a href="#">{{currentPage + 1}}</a></li>
            <li v-on:click.prevent="changeCurrentPage(currentPage + 2)"><a href="#">{{currentPage + 2}}</a></li>
            <li v-on:click.prevent="changeCurrentPage(currentPage + 1)">
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ["currentPage"],
  data() {
    return {
      appName: "Game Lister"
    };
  },
  methods: {
    changeCurrentPage: function(newPage) {
      this.$emit("updatePage", newPage);
    }
  }
};




</script>

<style scoped>
.pagination > li > a,
.pagination > li > span {
  color: #313131;
}
.pagination {
  transform: translate(-50%);
}

.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
  background-color: #fabd0f;
  color: #262424;
  border-color: #fabd0f
}
</style>