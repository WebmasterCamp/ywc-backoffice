import {observable} from "mobx";

class PaginationStore {
  @observable
  currentPage = 1;
}

export default new PaginationStore();
