export function handleFormError(
  error: any,
  formRef?: any,
) {
  const apiErrors = error.response?.data?.errors

  if (apiErrors && formRef?.value?.setErrors) {
    formRef.value.setErrors(
      Object.fromEntries(
        Object.entries(apiErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ]),
      ),
    )
  }

  return (
    error.response?.data?.message ||
    error.message ||
    'Something went wrong'
  )
}