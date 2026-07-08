import "./Button.css"

export default function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (as === "a" || href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
