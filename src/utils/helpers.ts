import { computed, type Ref } from 'vue'


const stringFieldToDate = (dateField: Ref<Date | undefined, Date | undefined>) => computed({
  get: () => dateField.value instanceof Date ? dateField.value.toISOString().split('T')[0] : '',
  set: (val: string) => { dateField.value = val ? new Date(val) : undefined }
})

export { stringFieldToDate }