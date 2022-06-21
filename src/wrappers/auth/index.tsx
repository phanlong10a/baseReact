import { Redirect } from 'umi';
// import { appToken } from '@/utils/apis/index';

export default (props: any) => {
  const isLogin = true;
  // debugger;
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};
