import { action, observable } from 'mobx'
import Question from '../interfaces/Question'
import { fetch } from '../utils/fetch'

class Questions {
  @observable public questions: Question = {
    content: [''],
    design: [''],
    general: [''],
    marketing: [''],
    programming: ['']
  }

  @action
  public async getQuestions() {
    const getQuestions = await fetch('questions', '', 'GET')

    if (getQuestions.status === 'success') {
      this.questions = getQuestions.payload
    }
  }
}

export default new Questions()
