const DropDownIcon: React.FC<any> = ({ isOpen }) => (
  <svg width={15} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" />
  </svg>
)

const SearchIcon: React.FC<any> = ({ className, width, color, onMouseOver, onMouseLeave }) => (
  <svg
    onMouseLeave={onMouseLeave}
    onMouseOver={onMouseOver && onMouseOver}
    className={className}
    width={width ? width : '1.5rem'}
    height="1.5rem"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke={color ? color : '#000000'}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CircleIcon: React.FC<any> = ({ width, color }: any) => (
  <svg width={width ? width : '1.8rem'} height={width ? width : '1.8rem'} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill={color ? color : '#fffffff'}
    />
  </svg>
)

const SettingIcon: React.FC<any> = () => (
  <svg width="1rem" height="1.8rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="#000000" />
    <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="#000000" />
    <path
      d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"
      fill="#000000"
    />
  </svg>
)

const DownloadIcon: React.FC<any> = ({ color }) => (
  <svg width={25} height={25}>
    <path
      d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
      fill="none"
      stroke={color ? color : '#000000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <polyline points="7.9 12.3 12 16.3 16.1 12.3" stroke={color ? color : '#000000'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line
      fill="none"
      stroke={color ? color : '#000000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12"
      x2="12"
      y1="2.7"
      y2="14.2"
    />
  </svg>
)

export { DropDownIcon, SearchIcon, CircleIcon, SettingIcon, DownloadIcon }
