import { IRouteComponentProps } from 'umi';
import MasterLayout from './masterLayout';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return <MasterLayout>{children}</MasterLayout>;
}
