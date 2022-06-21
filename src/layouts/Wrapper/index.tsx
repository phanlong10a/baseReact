// import { useAuth } from '@/utils/hooks/useAuth';
import { Redirect } from 'umi';

export default (props: any) => {
  const { auth } = useAuth();
  console.log('auth', props);

  const isLogin = true;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
