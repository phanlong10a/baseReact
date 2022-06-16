import { Redirect } from 'umi';

export default (props: any) => {
  // const { isLogin } = useAuth();
  const isLogin = true;
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};
