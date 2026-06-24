import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import { PostgrestError } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-state', () => {
  const activeError = ref<CustomError | ExtendedPostgrestError | null>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (error instanceof PostgrestError) {
      activeError.value = error
      ;(activeError.value as ExtendedPostgrestError).statusCode = customCode || 500
      return
    }

    if (typeof error === 'string') {
      isCustomError.value = true
    }

    activeError.value = typeof error === 'string' ? Error(error) : error
    activeError.value.customCode = customCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError
  }
})
