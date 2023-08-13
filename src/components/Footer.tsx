import React from 'react';

interface FooterProps {
	children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
	return <div>{children}</div>;
};

export default Footer;
