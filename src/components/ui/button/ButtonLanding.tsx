"use client"

import type React from "react"
import Link from "next/link"

interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline" | "default"
  size?: "sm" | "md" | "lg"
  href?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full"

  // Size styles
  const sizeStyles = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 py-2 text-base",
  }

  // Variant styles
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
    default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
  }

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
