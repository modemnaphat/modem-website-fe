"use client";

// Lib
import React from "react";
import { useFormikContext, withFormik } from "formik";
import isEmpty from "lodash/isEmpty";
import { enqueueSnackbar } from "notistack";

// Include in Project
import { TContact } from "@/app/utils/types";
import yupContact from "@/app/validations/yupContact.validate";
import { useContactMutation } from "@/app/hooks/api";
import { Button, Modal } from "@/app/components/shared";
import ModalContact from "./ModalContact";
import useModalFormik from "@/app/hooks/useModalFormik";

const initialValue: TContact = {
  email: "",
  name: "",
  tel: "",
  company: "",
  message: "",
};

const ContactSection: React.FC = () => {
  const { isModalOpen, handleOpen, handleClose } = useModalFormik<TContact>(
    "contact",
    initialValue
  );
  const { values, errors, setTouched } = useFormikContext<{
    contact: TContact;
  }>();

  const createContact = useContactMutation();

  const handleSubmit = async () => {
    setTouched({
      contact: {
        email: true,
        name: true,
        tel: true,
        company: true,
        message: true,
      },
    });
    if (!isEmpty(errors)) return;

    const packData: TContact = {
      email: values.contact.email,
      name: values.contact.name,
      tel: values.contact.tel,
      company: values.contact.company,
      message: values.contact.message,
    };

    createContact.mutate(packData, {
      onSuccess: () => {
        enqueueSnackbar("Send contact successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
        handleClose();
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-12 mt-16">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-3xl font-bold text-white text-center">Contact</h2>
        <p className="text-white text-center">
          If you interesting. Please send contact{" "}
          <span className="text-pink-400">message</span> to me
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Button
          name="Contact Me"
          type="button"
          onClick={() => handleOpen(initialValue)}
          isBold
          isPopping
        />
      </div>

      <ModalContact
        isLoading={createContact.isPending}
        isOpen={isModalOpen}
        onClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const EnhancedContact = withFormik({
  mapPropsToValues: () => ({
    contact: { ...initialValue },
  }),
  validateOnMount: true,
  validationSchema: yupContact,
  handleSubmit: () => {},
})(ContactSection);

export default EnhancedContact;
