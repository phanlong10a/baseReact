import { setLocale, useIntl } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const intl = useIntl();
  console.log(
    process.env.APP__END_POINT,
    process.env.APP__LOGIN_REDIRECT_ENDPOINT,
  );
  return <div>aaaaaaaaaaa</div>;
}
