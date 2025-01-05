import React from 'react';
import styles from './BasicButton.module.css';
function BasicButton({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={`${styles.basicButton} ${className}`} {...props}>
			{children}
		</button>
	);
}

export default BasicButton;
