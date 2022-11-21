import * as yup from 'yup';

export const validSchemaAddTrip = yup.object().shape({
    name: yup.string().required("Please, provide trip name!"),
    destination: yup
      .string()
      .required("Please, provide trip destination!"),
    note: yup.string().required("Please, provide trip note!"),
    topic: yup.string().required("Please, provide trip topic!"),
  })

  export const validSchemaAddExpense = yup.object().shape({
    amount: yup.number().min(1).required("Please, provide expense amount!"),
  })

  export const validSchemaLogin = yup.object().shape({
    email: yup.string().required("Please, provide account email!").email("Please, enter email valid!"),
    password: yup.string().required("Please, provide account password!"),
  })

  export const validSchemaSignUp = yup.object().shape({
    email: yup.string().required("Please, provide account email!").email("Please, enter email valid!"),
    password: yup.string().required("Please, provide account password!").min(6, "Password should be at least 6 characters."),
    name: yup.string().required("Please, provide account name!"),
  })