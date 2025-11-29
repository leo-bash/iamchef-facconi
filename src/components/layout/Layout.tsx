import { Outlet } from "react-router";

interface LayoutProps {
  header: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout = ({ header, footer }: LayoutProps) => {
  return (
    <main>
      <header>{header}</header>
      <section>
        <Outlet />
      </section>
      {footer && footer}
    </main>
  );
};

export default Layout;