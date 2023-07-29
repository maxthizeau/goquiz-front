import React from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const variants: { [key: string]: HTMLDivElement['className'] } = {
  none: '',
  primary: 'bg-blue-500  text-slate-50',
  secondary: 'bg-transparent  text-blue-500',
  light: 'bg-transparent text-sky-50',
  danger: 'bg-red-100  text-red-800',
}

type Props = {
  variant?: keyof typeof variants
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
} & (LinkProps | ButtonProps)

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asLink: true
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false
}

const LinkButton: React.FC<Props> = ({ children, ...props }) => {
  const navigate = useNavigate()
  if (props.asLink) {
    const { asLink, href, onClick, ...rest } = props

    // use router for navigation to prevent full page reload
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (href) navigate(href)
      if (onClick) onClick(e)
    }

    return (
      <a onClick={handleClick} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return <button {...props}>{children}</button>
}

const Button: React.FC<Props> = ({
  children,
  className,
  leftIcon,
  rightIcon,
  variant = 'primary',
  ...props
}) => {
  return (
    <LinkButton
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-lg border-4 border-solid px-4 py-2 text-center font-semibold transition-all hover:shadow-lg hover:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </LinkButton>
  )
}

export default Button
