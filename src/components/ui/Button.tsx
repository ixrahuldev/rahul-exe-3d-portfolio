import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  asAnchor = false,
  href,
  className = '',
  target,
  rel,
  ...props
}) => {
  const combinedClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        aria-label={props['aria-label']}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClassName} {...props}>
      {content}
    </button>
  );
};
