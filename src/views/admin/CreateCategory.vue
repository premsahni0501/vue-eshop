<template>
  <div class="container-fluid bg-color create p-0 fixed-top">
    <div class="container">
      <div class="row">
        <div class="col col-12">
          <form @submit.prevent="addNewCategory">
            <h2>Add New Category</h2>
            <div class="form-group">
              <input
                type="text"
                placeholder="Category Name"
                class="form-control"
                v-model="categoryData.title"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Icon name"
                class="form-control"
                v-model="categoryData.icon"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Color name or code"
                class="form-control"
                v-model="categoryData.color"
                required
              />
            </div>
            <div class="form-group">
              <select class="form-control w-100" v-model="categoryData.iconType">
                <option value="icon">Icon</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Sub Categories"
                class="form-control"
                v-model="categoryData.items"
              />
              <p>
                <small>Seperate multiple sub categories with comma.</small>
              </p>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
            <button class="btn btn-outline-dark ml-3" @click="goBack">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IShoppingCategory, ICategory } from '@/interface/ICategory';
import { mapGetters } from 'vuex';

@Component({
  computed: mapGetters(['shoppingList']),
})
export default class CreateCategory extends Vue {
  public categoryData = {
    title: '',
    icon: '',
    color: '',
    iconType: 'icon',
    items: '',
  };
  public shoppingList!: ICategory;
  public created() {
    this.$store.dispatch('loadCategory');
  }
  public addNewCategory() {
    Object.values(this.categoryData).forEach((item) => {
      if (item == '') {
        return;
      }
    });
    let listItem: string[] = [];
    let listItemTrimmed: string[] = [];
    if (this.categoryData.items != '') {
      listItem = this.categoryData.items.trim().split(',');
      listItemTrimmed = listItem.map((i) => i.trim());
    }
    const category: IShoppingCategory = {
      ...this.categoryData,
      icon:
        this.categoryData.iconType === 'image'
          ? this.categoryData.icon + '.svg'
          : this.categoryData.icon,
      items: listItemTrimmed,
      groupId: 0,
    };
    this.$store.dispatch('addCategory', category);
    this.goBack();
  }
  public goBack() {
    this.$router.replace({ path: '/admin' });
  }
}
</script>
<style lang="scss" scoped>
.create {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  form {
    max-width: 500px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1rem;
    margin-top: 2rem;
  }
}
</style>
