import React from 'react';
import { Space, Typography, Skeleton } from 'antd';
import { SyncOutlined, SlidersOutlined } from '@ant-design/icons';
import Card from '../../../shared/components/Card';
/* Import your custom hook here: import { useFeatureData } from '../hooks/useFeatureData'; */

const { Text } = Typography;

/**
 * WIDGET TEMPLATE
 * Boilerplate for a dashboard widget using Ant Design and mock API.
 */
const WidgetTemplate = () => {
  /* Replace with your feature's hook: const { data, loading } = useFeatureData(); */
  const data = null;
  const loading = true;

  if (loading || !data) {
    return (
      <Card title="Widget Title">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <Card 
      title="Widget Title" 
      extra={
        <Space size="middle" className="text-slate-400">
          <SyncOutlined style={{ cursor: 'pointer' }} />
          <SlidersOutlined style={{ cursor: 'pointer' }} />
        </Space>
      }
    >
      <div className="flex-1 mt-2">
        {/* Your Widget Content Here */}
      </div>
    </Card>
  );
};

export default WidgetTemplate;
