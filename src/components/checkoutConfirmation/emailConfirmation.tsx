import React from 'react'

function EmailConfirmation() {
  return (
    <div className="mt-8 text-center">
    <p className="text-gray-600 dark:text-gray-400">
        A confirmation email has been sent to <a href="mailto:john.doe@example.com" className="text-primary-600 hover:text-primary-300 underline">john.doe@example.com</a>
    </p>
</div>
  )
}

export default EmailConfirmation
