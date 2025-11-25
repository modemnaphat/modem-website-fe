import * as Yup from "yup";

const yupContact = Yup.object().shape({
  contact: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    tel: Yup.string(),
    company: Yup.string(),
    message: Yup.string(),
  }),
});

export default yupContact;
