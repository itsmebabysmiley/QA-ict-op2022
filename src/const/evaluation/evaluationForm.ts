import type { IFormQuestionOption, IFormSection } from '~/types/formbuilder'
import { QuestionType } from '~/types/formbuilder'

export const RatingOptions: IFormQuestionOption[] = [
  {
    label: 'Strongly Agree',
    value: 'strongly-agree',
  },
  {
    label: 'Agree',
    value: 'agree',
  },
  {
    label: 'Neutral',
    value: 'neutral',
  },
  {
    label: 'Disagree',
    value: 'disagree',
  },
  {
    label: 'Strongly Disagree',
    value: 'strongly-disagree',
  },
]

export const Evaluation_EN: IFormSection[] = [
  {
    sectionNo: 1,
    sectionName: 'General Information',
    questions: [
      {
        groupName: 'General Information',
        isTitleShown: false,
        questions: [
          {
            questionNo: 1,
            question: 'Role',
            questionType: QuestionType.Radio,
            options: [
              {
                label: 'High School Student',
                value: 'high-school-student',
              },
              {
                label: 'University Student',
                value: 'university-student',
              },
              {
                label: 'Teacher / Instructor',
                value: 'teacher',
              },
              {
                label: 'Parents / Guardians',
                value: 'parents',
              },
              {
                label: 'Staff / Instructor of Mahidol University',
                value: 'staff',
              },
              {
                label: 'Other',
                value: 'other',
              },
            ],
          },
          {
            questionNo: 2,
            question: 'Gender',
            questionType: QuestionType.Radio,
            options: [
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
              {
                label: 'Other',
                value: 'other',
              },
            ],
          },
          {
            questionNo: 3,
            question: 'How did you know about the event?',
            questionType: QuestionType.Checkbox,
            options: [
              {
                label: 'MUICT Open House Facebook Page',
                value: 'muict-op-facebook',
              },
              {
                label: 'PR Video',
                value: 'pr-video',
              },
              {
                label: 'ICT Website',
                value: 'ict-website',
              },
              {
                label: 'University Website',
                value: 'university-website',
              },
              {
                label: 'Educational websites (e.g. Dek-D, CampHub, etc.)',
                value: 'educational-website',
              },
              {
                label: 'Social Media (e.g. Facebook, Twitter, Instagram, etc.)',
                value: 'social-media',
              },
              {
                label: 'Leaflet',
                value: 'leaflet',
              },
              {
                label: 'Poster',
                value: 'poster',
              },
              {
                label: 'Friends',
                value: 'friends',
              },
              {
                label: 'PR from the university',
                value: 'university-pr',
              },
              {
                label: 'Invitation letter',
                value: 'invitation-letter',
              },
              {
                label: 'Other',
                value: 'other',
              },
            ],
          },
          {
            questionNo: 4,
            question: 'Types of activities that you are participated in',
            questionType: QuestionType.Checkbox,
            options: [
              {
                label: 'Guidance',
                value: 'guidance',
              },
              {
                label: 'Activity Booths',
                value: 'activity-booths',
              },
              {
                label: 'On-stage performance',
                value: 'on-stage-performance',
              },
              {
                label: 'Student Projects Exhibition',
                value: 'student-projects-exhibition',
              },
              {
                label: 'International Experience Sharing',
                value: 'international-experience-sharing',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sectionNo: 2,
    sectionName:
      'Satisfaction / Knowledge Understanding / Knowledge Application and Evaluation List',
    questions: [
      {
        groupName: 'Service, Location, Date and Time',
        isTitleShown: true,
        questions: [
          {
            questionNo: 1,
            question: "Appropriate choice of activities' date and time.",
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 2,
            question: 'Appropriate choice of location for the activities.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 3,
            question: 'Service and convenience provided by ICT students.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
        ],
      },
      {
        groupName: 'Format, Benefit, and Overall',
        isTitleShown: true,
        questions: [
          {
            questionNo: 4,
            question: 'Participants understand ICT academic programs.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 5,
            question:
              'Participants gained knowledge and entertainment from stage activities and performance show.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 6,
            question:
              "Participants gained knowledge and got to know seniors from students' activity booths.",
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 7,
            question:
              'Level of knowledge and inspiration you have received from the previous work of seniors and alumni.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 8,
            question:
              'Participants gained basic knowledge of ICT from the guidance activities.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 9,
            question:
              'Participants gained knowledge from the international experience sharing session.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 10,
            question:
              'Level of benefit and knowledge you have received from your visiting.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 11,
            question: 'Overall satisfaction of the activity.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            questionNo: 12,
            question:
              'Being encouraged and interested in applying for the Faculty of ICT or would like to help promote the Faculty of ICT after entering the MUICT Open House 2022 event.',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
        ],
      },
    ],
  },
  {
    sectionNo: 3,
    sectionName: 'Others',
    questions: [
      {
        groupName: 'Others',
        isTitleShown: false,
        questions: [
          {
            questionNo: 1,
            question:
              'What are the top 3 programs, faculties, and universities you are interested in? (Rank 1 is the most interested one)',
            questionType: QuestionType.MultipleText,
            quantity: 3,
          },
          {
            questionNo: 2,
            question:
              'What are the top 3 factors that you consider when selecting the program to apply for? (Rank 1 is the most important one)',
            questionType: QuestionType.MultipleText,
            quantity: 3,
          },
          {
            questionNo: 3,
            question:
              'What are things that you liked or impressed from participating in this event?',
            questionType: QuestionType.TextArea,
          },
          {
            questionNo: 4,
            question:
              'What are things that you disliked or unimpressed from participating in this event?',
            questionType: QuestionType.TextArea,
          },
          {
            questionNo: 5,
            question: 'Other suggestions',
            questionType: QuestionType.TextArea,
          },
        ],
      },
    ],
  },
]
