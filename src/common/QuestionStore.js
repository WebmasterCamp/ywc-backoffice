import {observable, action} from "mobx";
import {fetch} from "../utils/fetch";

class QuestionStore {
  @observable
  questions = {
    general: [],
    programming: [],
    content: [],
    design: [],
    marketing: [],
  };

  constructor() {
    this.fetch();
  }

  @action
  async fetch() {
    const response = await fetch("questions");
    if (response.status === "success") {
      this.questions = response.payload;
    }
  }
}

export default new QuestionStore();
