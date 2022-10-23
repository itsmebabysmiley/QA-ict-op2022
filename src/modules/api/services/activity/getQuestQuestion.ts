import type { I18nTranslation, IQuestion } from '~/const/activity/questions'
import { QUESTIONS, QUESTION_TYPE } from '~/const/activity/questions'

export const formatQuestion = (
  question: IQuestion<I18nTranslation>,
  lang: 'th' | 'en' = 'th',
  answer = false
) => {
  const questionResult: Partial<IQuestion> = {
    id: question.id,
    type: question.type,
    questNo: question.questNo,
    questTitle: question.questTitle[lang],
    questions: question.questions[lang],
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

  if (answer) {
    Object.assign(questionResult, {
      expectedAnswer: question.expectedAnswer,
    })
  }

  return questionResult as IQuestion
}

export const getQuestQuestion = async (
  questNo: number,
  lang: 'th' | 'en' = 'th',
  answer = false
) => {
  const question = QUESTIONS.filter((q) => q.questNo === questNo)

  if (!question || !question.length) {
    throw new Error('Question not found')
  }

  return question.map((q) => formatQuestion(q, lang, answer))
}
