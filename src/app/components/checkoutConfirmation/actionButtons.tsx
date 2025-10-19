import React from 'react'
import { useTranslations } from 'next-intl';
function ActionButtons() {
  const t = useTranslations();
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <a href="dashboard-track.php" className="te-btn te-btn-primary">
        {t('Track Your Order')}
    </a>
    <a href="index.php" className="te-btn te-btn-default">
        {t('Continue Shopping')}
    </a>
</div>
  )
}

export default ActionButtons
