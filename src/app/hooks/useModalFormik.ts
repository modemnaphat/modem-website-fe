// Lib
import { useFormikContext } from 'formik'
import { useState } from 'react'

const useModalFormik = <T,>(key: string, initialObject?: T) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setFieldValue, setTouched, setErrors } = useFormikContext()

  const handleOpen = (data?: T) => {
    setIsModalOpen(true)

    if (data) {
      setFieldValue(`${key}`, data)
    } else if (initialObject) setFieldValue(`${key}`, initialObject)
  }

  const handleClose = () => {
    setIsModalOpen(false)

    if (initialObject) setFieldValue(`${key}`, initialObject)
    setErrors({})
    setTouched({}, false)
  }

  return { isModalOpen, handleClose, handleOpen }
}

export default useModalFormik