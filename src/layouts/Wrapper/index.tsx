import { RecoilRoot } from 'recoil';

import '@/global/styles.less';
import { useAuth } from '@/utils/hooks/useAuth';
import { useLayoutEffect } from 'react';
import { history, Redirect, useLocation } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';

const Wrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { auth, getAccessToken } = useAuth();
  const location = useLocation();

  useLayoutEffect(() => {
    const token = getAccessToken();

    if (!token) history.push('/login');
    if (token && location.pathname === '/login') history.push('/');
  }, []);

  if (auth?.loading) return <LoadingOutlined />;

  return <>{children}</>;
};

const WrapperProvider = ({ children }: any) => {
  return (
    <RecoilRoot>
      <Wrapper>{children}</Wrapper>
    </RecoilRoot>
  );
};

export default WrapperProvider;
