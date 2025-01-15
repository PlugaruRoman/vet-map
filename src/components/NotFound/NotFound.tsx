import { SignPostIcon } from 'src/assets'

import './index.css'

export const NotFound = () => {
  return (
    <div className="not-found">
      <SignPostIcon />

      <p className="not-found-title">Nimic nu a fost găsit</p>

      <p className="not-found-message">
        Încercați să vă modificați solicitarea sau să căutați prin categorii
      </p>
    </div>
  )
}
