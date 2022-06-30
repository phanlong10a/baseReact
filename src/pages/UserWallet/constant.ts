import { StatusAccount } from '@/utils/enum';

export const mockupData = [
  {
    id: 123,
    title: 'Tiêu đề bài viết',
    isActive: true,
    content: `<h3>3. Explore more components<a href="https://ant.design/docs/react/getting-started#3.-Explore-more-components" rel="noopener noreferrer" target="_blank" style="color: var(--ant-primary-color);">#</a></h3><p>You can view the list of components in the side menu of the Components page, such as the&nbsp;<a href="https://ant.design/components/alert/" rel="noopener noreferrer" target="_blank" style="color: var(--ant-primary-color);">Alert</a>&nbsp;component. Plenty of examples are also provided in the component pages and API documentation as well.</p><p>Click the "Open in Editor" icon in the first example to open an editor with source code to use out-of-the-box. Now you can import the&nbsp;<code style="background-color: rgb(242, 244, 245);">Alert</code>&nbsp;component into the codesandbox:</p><pre class="ql-syntax" spellcheck="false">- import { DatePicker, message } from 'antd';
    + import { DatePicker, message, Alert } from 'antd';
    </pre><p>Now add the following jsx inside the&nbsp;<code style="background-color: rgb(242, 244, 245);">render</code>&nbsp;function.</p><pre class="ql-syntax" spellcheck="false">  &lt;DatePicker onChange={value =&gt; this.handleChange(value)} /&gt;
      &lt;div style={{ marginTop: 20 }}&gt;
    -   Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
    +   &lt;Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} /&gt;
      &lt;/div&gt;
    </pre><p>Select a date, and you can see the effect in the preview area on the right:</p>`,
  },
];
