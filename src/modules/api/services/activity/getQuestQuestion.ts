import type { I18nTranslation, IQuestion } from '~/const/activity/questions'
import { QUESTIONS, QUESTION_TYPE } from '~/const/activity/questions'

export const formatQuestion = (
  question: IQuestion<I18nTranslation>,
  lang: 'th' | 'en' = 'th',
  showQuestion = false,
  showAnswer = false
) => {
  const questionResult: Partial<IQuestion> = {
    id: question.id,
    type: question.type,
    questNo: question.questNo,
    questTitle: question.questTitle[lang],
  }

  if (
    question.type === QUESTION_TYPE.MULTIPLE_CHOICE ||
    question.type === QUESTION_TYPE.MULTIPLE_SELECT
  ) {
    Object.assign(questionResult, {
      choices: Object.entries(question.choices).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value[lang],
        }),
        {}
      ),
    })
  }

  if (showQuestion) {
    Object.assign(questionResult, {
      question: question.question[lang],
    })
  }

  if (showAnswer) {
    Object.assign(questionResult, {
      expectedAnswer: question.expectedAnswer,
    })
  }

  return questionResult as IQuestion
}

export const getQuestQuestion = async (
  questNo: number,
  lang: 'th' | 'en' = 'th',
  question = true,
  answer = false
) => {
  const quests = QUESTIONS.filter((q) => q.questNo === questNo)

  if (!quests || !quests.length) {
    throw new Error('Question not found')
  }

  return quests.map((q) => formatQuestion(q, lang, question, answer))
}
