import { Tabs, Tab } from 'react-bootstrap';
import DetailsEditor from './DetailsEditor';
import QuestionsEditor from './QuestionsEditor';
import { useState } from 'react';

export default function QuizEditor() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div id="wd-quizzes-editor" className="wd-padding-fat">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'details')}
        className="mb-4"
      >
        <Tab eventKey="details" title="Details">
          <DetailsEditor />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuestionsEditor />
        </Tab>
      </Tabs>
    </div>
  );
}
