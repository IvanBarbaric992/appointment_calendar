import React, { FC } from 'react';

import Footer from 'Components/Footer';
import Header from 'Components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="container">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
