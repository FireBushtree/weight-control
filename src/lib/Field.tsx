import React from 'react'

interface FieldProps {
  label: React.ReactNode
  width: string
  children: React.ReactNode
  textAlign?: 'left' | 'right'
}

const textAlignMap = {
  left: 'text-left',
  right: 'text-right'
}

const Field: React.FC<FieldProps> = (props: FieldProps) => {
  const { children, width, label, textAlign } = props
  const textAlignStyle = textAlignMap[textAlign ?? 'left']

  return (
    <div className="not-last:p-b-24px flex items-center">
      <div className={`${textAlignStyle} p-r-24px font-size-14px`} style={{ width }}>
        {label}
      </div>
      <div className="flex flex-1 items-center">{children}</div>
    </div>
  )
}

export default Field
