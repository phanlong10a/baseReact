import { useToggle } from 'ahooks';
import { Layout } from 'antd';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useIntl } from 'umi';
import MainHeader from '../Header/main.header';
import Sidebar from '../Sidebar';
import { authRoutes } from '../../../config/routes/index';
import '/src/global/styles.less';
import { Helmet } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }: any) => {
  const [collapsed, setCollapsed] = useToggle(false);

  const { formatMessage } = useIntl();
  const location = useLocation();

  const findTitle = () => {
    const result = authRoutes.find((r) => r.path === location.pathname);
    return result?.title;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{formatMessage({ id: findTitle() })}</title>
      </Helmet>
      <Layout>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed.toggle()} />
        <Layout className="site-layout">
          <MainHeader />
          <Content>
            <div className="site-layout-background" style={{ minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const MainLayout: React.FC = ({ children }) => {
  return <App>{children}</App>;
};

export default MainLayout;
