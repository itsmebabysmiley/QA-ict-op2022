import { normalizeString } from '~/utils/string'

export const checkAnswer = (
  expectedAnswer: string | string[],
  answer: string
) => {
  const normalizedExpectedAnswer = Array.isArray(expectedAnswer)
    ? expectedAnswer.map((a) => normalizeString(a))
    : normalizeString(expectedAnswer)

  const normalizedAnswer = normalizeString(answer)

  const result = Array.isArray(normalizedExpectedAnswer)
    ? normalizedExpectedAnswer.includes(normalizedAnswer)
    : normalizedExpectedAnswer === normalizedAnswer

  return result
}
