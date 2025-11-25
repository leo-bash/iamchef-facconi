interface LayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
}
const Layout = ({ header, main, footer }: LayoutProps) => {
  return (
    <main>
      <header>{header}</header>
      <section>
        {main}
      </section>
      {footer && footer}
    </main>
  );
};

export default Layout;
