import { useToggle } from 'ahooks';
import { Layout, Modal } from 'antd';
import React, { createContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useIntl } from 'umi';
import MainHeader from '../Header/main.header';
import Sidebar from '../Sidebar';
import { authRoutes } from '../../../config/routes/index';
import '/src/global/styles.less';
import { Helmet } from 'umi';
const ReachableContext = createContext<string | null>(null);

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }: any) => {
  const [collapsed, setCollapsed] = useToggle(false);

  const [modal, contextHolder] = Modal.useModal();
  const { formatMessage } = useIntl();
  const location = useLocation();

  const findTitle = () => {
    const result = authRoutes.find((r) => r.path === location.pathname);
    return result?.title;
  };

  return (
    <ReachableContext.Provider value="Light">
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
            {contextHolder}
          </Content>
        </Layout>
      </Layout>
    </ReachableContext.Provider>
  );
};

const MainLayout: React.FC = ({ children }) => {
  return <App>{children}</App>;
};

export default MainLayout;
