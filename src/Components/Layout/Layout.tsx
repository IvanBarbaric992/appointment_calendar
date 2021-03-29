import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Footer from 'Components/Footer';
import Header from 'Components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <CssBaseline />
    <Container maxWidth="xl">
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  </>
);

export default Layout;
