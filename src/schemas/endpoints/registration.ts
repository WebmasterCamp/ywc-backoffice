import { Major, User } from '../models'
import moment from 'moment'
import { z } from 'zod'

export type RegistrationGetInfoResponse = Pick<
  User,
  | 'id'
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'firstNameEN'
  | 'lastNameEN'
  | 'nickname'
  | 'birthdate'
  | 'phone'
  | 'email'
  | 'religion'
  | 'sex'
  | 'picture'
  | 'address'
  | 'subDistrict'
  | 'district'
  | 'province'
  | 'postalCode'
  | 'educationStatus'
  | 'academicYear'
  | 'university'
  | 'faculty'
  | 'department'
  | 'step'
>

export const RegistrationUpdateInfoRequest = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  firstNameEN: z.string(),
  lastNameEN: z.string(),
  nickname: z.string(),
  birthdate: z
    .string()
    .refine(bd => moment(bd).isValid())
    .transform(bd => moment.utc(bd).toDate()),
  phone: z.string(),
  email: z.string().email(),
  religion: z.string(),
  sex: z.string(),
  picture: z.string(),
  address: z.string(),
  subDistrict: z.string(),
  district: z.string(),
  province: z.string(),
  postalCode: z.string(),
  educationStatus: z.string(),
  academicYear: z.string(),
  university: z.string(),
  faculty: z.string(),
  department: z.string(),
})

export type RegistrationGetContactResponse = Pick<
  User,
  | 'id'
  | 'disease'
  | 'foodAllergy'
  | 'medAllergy'
  | 'shirtSize'
  | 'activities'
  | 'knowCamp'
  | 'emergencyFirstName'
  | 'emergencyLastName'
  | 'emergencyPhone'
  | 'emergencyPhoneRelated'
  | 'major'
  | 'step'
>

export const RegistrationUpdateContactRequest = z.object({
  disease: z.string(),
  foodAllergy: z.string(),
  medAllergy: z.string(),
  shirtSize: z.string(),
  activities: z.string(),
  knowCamp: z.array(z.string()),
  emergencyFirstName: z.string(),
  emergencyLastName: z.string(),
  emergencyPhone: z.string(),
  emergencyPhoneRelated: z.string(),
  major: z.nativeEnum(Major),
})

export type RegistrationGetGeneralQuestionsResponse = Pick<
  User,
  'id' | 'step'
> & {
  answers: string[]
}

export const RegistrationUpdateGeneralQuestionsRequest = z.object({
  answers: z.array(z.string()),
})

export type RegistrationGetMajorQuestionsResponse = Pick<
  User,
  'id' | 'step'
> & {
  major: Major | null
  answers: string[]
}

export const RegistrationUpdateMajorQuestionsRequest = z.object({
  answers: z.array(z.string()),
})

export interface RegistrationGetSummaryResponse {
  profile: Pick<
    User,
    | 'id'
    | 'title'
    | 'firstName'
    | 'lastName'
    | 'firstNameEN'
    | 'lastNameEN'
    | 'nickname'
    | 'birthdate'
    | 'phone'
    | 'email'
    | 'religion'
    | 'sex'
    | 'picture'
    | 'address'
    | 'subDistrict'
    | 'district'
    | 'province'
    | 'postalCode'
    | 'educationStatus'
    | 'academicYear'
    | 'university'
    | 'faculty'
    | 'department'
    | 'disease'
    | 'foodAllergy'
    | 'medAllergy'
    | 'shirtSize'
    | 'activities'
    | 'knowCamp'
    | 'emergencyFirstName'
    | 'emergencyLastName'
    | 'emergencyPhone'
    | 'emergencyPhoneRelated'
    | 'major'
    | 'step'
  >
  generalQuestions: string[]
  majorQuestions: string[]
}
