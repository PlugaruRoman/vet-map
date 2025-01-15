import './index.css'

import { CloseIcon, SearchIcon } from 'src/assets'
import { useState } from 'react'

type Props = {
  value?: string
  onChange: (value?: string) => void
}

export const Search = ({ value, onChange }: Props) => {
  const [isFocused, setIsFocused] = useState<string | boolean>()

  const onFocusSearch = () => setIsFocused(true)
  const onBlurSearch = () => setIsFocused(false)

  const onClickClear = () => {
    onChange('')
    onBlurSearch()
  }

  return (
    <div className={`search ${isFocused ? 'search-focused' : ''}`}>
      <SearchIcon
        className={`search-icon ${isFocused ? 'search-icon-focused' : ''}`}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Căutarea instituțiilor"
        value={value || ''}
        onChange={(value) => onChange?.(value.target.value)}
        onFocus={onFocusSearch}
        onBlur={onBlurSearch}
      />

      {(isFocused || value) && (
        <CloseIcon onClick={onClickClear} className="search-close-icon" />
      )}
    </div>
  )
}
