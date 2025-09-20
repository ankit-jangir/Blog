import { toast } from 'sonner'

export function showSuccessToast(message, options = {}) {
  const { actionLabel, onAction } = options
  const id = toast.success(message, {
    action: actionLabel
      ? {
          label: actionLabel,
          onClick: () => {
            if (onAction) {
              try { onAction() } catch {}
            }
            toast.dismiss(id)
          },
        }
      : undefined,
    ...options,
  })
  return id
}

export function showErrorToast(message, options = {}) {
  const id = toast.error(message, options)
  return id
}

export function showInfoToast(message, options = {}) {
  const id = toast(message, options)
  return id
}


