"use client";

// Lib
import React from "react";

// Include in Project
import { Button, Input, Modal } from "@/app/components/shared";
import { TContact } from "@/app/utils/types";
import { useFormikContext } from "formik";

type Props = {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const ModalContact: React.FC<Props> = ({
  isLoading,
  isOpen,
  onClose,
  handleSubmit,
}) => {
  const { values, errors, touched } = useFormikContext<{ contact: TContact }>();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact"
      bottom={
        <div className="flex justify-end">
          <div className="w-36">
            <Button
              name="Send"
              type="submit"
              fullWidth
              onClick={handleSubmit}
              isBold
              radius="12"
              isLoading={isLoading}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          name="contact.email"
          label="E-Mail"
          placeholder="E-Mail"
          require
          fullWidth
        />
        <Input
          name="contact.name"
          label="Name"
          placeholder="Name"
          require
          fullWidth
        />
        <Input
          name="contact.company"
          label="Company"
          placeholder="Company"
          fullWidth
        />
        <Input
          name="contact.tel"
          label="Phone Number"
          placeholder="Phone Number"
          fullWidth
        />
        <Input
          name="contact.message"
          label="Message"
          placeholder="say something..."
          fullWidth
          as="textarea"
        />
      </div>
    </Modal>
  );
};

export default ModalContact;
